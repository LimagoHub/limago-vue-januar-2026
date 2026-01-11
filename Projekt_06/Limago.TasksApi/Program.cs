using System.Collections.Concurrent;
using Microsoft.OpenApi.Models;

namespace Limago.TasksApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Swagger
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Limago.TasksApi", Version = "v1" });
        });

        var app = builder.Build();

        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseHttpsRedirection();

        // --- Domain Model ---
        // (Types dürfen hier stehen, weil wir nicht mehr im Top-Level-Modus sind)
        // Für Klarheit: als lokale Typen geht's hier nicht, daher unten als record außerhalb Main.
        var db = new ConcurrentDictionary<long, TaskItem>();

        // Seed
        db[1] = new TaskItem(1, "Backend läuft", true);
        db[2] = new TaskItem(2, "GET /api/tasks", false);
        db[3] = new TaskItem(3, "YEPP POST/DELETE/TOGGLE implementieren", false);

        // --- Endpoints ---
        app.MapGet("/api/tasks", () =>
        {
            var items = db.Values.OrderByDescending(t => t.Id).ToArray();
            return Results.Ok(items);
        });

        app.MapPost("/api/tasks", (CreateTaskRequest req) =>
        {
            var title = (req.Title ?? "").Trim();
            if (string.IsNullOrWhiteSpace(title))
                return Results.BadRequest(new { message = "Titel darf nicht leer sein." });

            var id = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var created = new TaskItem(id, title, false);
            db[id] = created;

            return Results.Ok(created);
        });

        app.MapPost("/api/tasks/{id:long}/toggle", (long id) =>
        {
            if (!db.TryGetValue(id, out var existing))
                return Results.NotFound(new { message = "Task nicht gefunden." });

            var updated = existing with { Done = !existing.Done };
            db[id] = updated;

            return Results.Ok(updated);
        });

        app.MapDelete("/api/tasks/{id:long}", (long id) =>
        {
            if (!db.TryRemove(id, out _))
                return Results.NotFound(new { message = "Task nicht gefunden." });

            return Results.NoContent();
        });

        app.Run();
    }

    public record TaskItem(long Id, string Title, bool Done);
    public record CreateTaskRequest(string Title);
}

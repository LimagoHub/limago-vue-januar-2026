# Schritt 11 – ASP.NET Core Backend + Vue Frontend verbinden

In diesem Schritt wird ein **ASP.NET Core Minimal API Backend** erstellt und
mit dem Vue-Frontend (Vite + Pinia) verbunden.  
Die Verbindung erfolgt im Development über den **Vite Proxy**.

---

## Ziel
- ASP.NET Core Backend mit Minimal APIs erstellen
- CRUD-Endpunkte für Tasks bereitstellen
- Backend lokal starten
- Vue-Frontend über Vite Proxy anbinden
- Mock API vollständig ersetzen

---

## Backend-Endpunkte (Vertrag)

- `GET /api/tasks`
- `POST /api/tasks`
- `POST /api/tasks/{id}/toggle`
- `DELETE /api/tasks/{id}`

---

## 11.1 Backend-Projekt erstellen

```powershell
dotnet new webapi -n Limago.TasksApi
cd Limago.TasksApi
dotnet run
```

Backend läuft unter:
```
http://localhost:5052
```

---

## 11.2 Program.cs (klassische Variante)

```csharp
using System.Collections.Concurrent;
using Microsoft.OpenApi.Models;

namespace Limago.TasksApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Limago.TasksApi",
                Version = "v1"
            });
        });

        var app = builder.Build();

        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseHttpsRedirection();

        var db = new ConcurrentDictionary<long, TaskItem>();

        db[1] = new TaskItem(1, "Backend läuft", true);
        db[2] = new TaskItem(2, "GET /api/tasks", false);
        db[3] = new TaskItem(3, "POST / DELETE / TOGGLE", false);

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
```

---

## 11.3 Swagger testen

```
http://localhost:5052/swagger
```

---

## 11.4 Vite Proxy konfigurieren

```ts
server: {
  proxy: {
    "/api": {
      target: "http://localhost:5052",
      changeOrigin: true,
      secure: false,
    },
  },
},
```

Nach Änderung:
```powershell
npm run dev
```

---

## Ergebnis

- Vue-App spricht live mit ASP.NET Core
- Keine CORS-Probleme im Development
- Mock API ersetzt

---

## Merksätze

- Frontend nutzt nur `/api/...`
- Vite Proxy leitet an ASP.NET Core weiter
- Backend und Frontend bleiben entkoppelt

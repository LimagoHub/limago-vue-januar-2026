<script setup lang="ts">
    import axios from "axios";
    import { onMounted, ref } from "vue";

    type WeatherForecast = {
        date: string;
        temperatureC: number;
        temperatureF: number;
        summary?: string;
    };

    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const items = ref<WeatherForecast[]>([]);

    async function load() {
        isLoading.value = true;
        error.value = null;
        try {
            // Wichtig: relative URL => gleicher Host/Port wie Backend in Production
            const res = await axios.get<WeatherForecast[]>("/WeatherForecast");
            items.value = res.data;
        } catch (e: any) {
            error.value = e?.message ?? "Fehler beim Laden";
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(load);
</script>

<template>
    <main style="font-family: system-ui; padding: 1rem; max-width: 900px;">
        <h1>WeatherForecast (Vue + Axios)</h1>

        <button @click="load" :disabled="isLoading">
            {{ isLoading ? "Lade..." : "Neu laden" }}
        </button>

        <p v-if="error" style="color:#b00; margin-top: 0.75rem;">
            Fehler: {{ error }}
        </p>

        <table v-if="items.length" style="margin-top: 1rem; border-collapse: collapse; width: 100%;">
            <thead>
                <tr>
                    <th style="text-align:left; border-bottom:1px solid #ddd; padding:.5rem;">Date</th>
                    <th style="text-align:right; border-bottom:1px solid #ddd; padding:.5rem;">Temp (°C)</th>
                    <th style="text-align:right; border-bottom:1px solid #ddd; padding:.5rem;">Temp (°F)</th>
                    <th style="text-align:left; border-bottom:1px solid #ddd; padding:.5rem;">Summary</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="x in items" :key="x.date">
                    <td style="padding:.5rem; border-bottom:1px solid #f0f0f0;">{{ x.date }}</td>
                    <td style="padding:.5rem; border-bottom:1px solid #f0f0f0; text-align:right;">{{ x.temperatureC }}</td>
                    <td style="padding:.5rem; border-bottom:1px solid #f0f0f0; text-align:right;">{{ x.temperatureF }}</td>
                    <td style="padding:.5rem; border-bottom:1px solid #f0f0f0;">{{ x.summary }}</td>
                </tr>
            </tbody>
        </table>

        <p v-else-if="!isLoading" style="margin-top: 1rem; opacity: .8;">
            Keine Daten.
        </p>
    </main>
</template>

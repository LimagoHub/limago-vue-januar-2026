<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container">
        <span class="navbar-brand">Personen-Manager</span>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/personen">Personen</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/weather">Wetter</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <div class="py-4">
      <router-view />
    </div>
  </main>
</template>

<style>
/* Aktiven Link hervorheben (Bootstrap Klasse) */
.router-link-active {
  color: #fff !important;
  font-weight: bold;
}
</style>

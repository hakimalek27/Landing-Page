<script>
    import { fade } from "svelte/transition";
</script>

<div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar simple -->
    <nav class="bg-white shadow-sm px-6 py-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <a
                href="/"
                class="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
                <div
                    class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
                >
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        class="w-8 h-8 object-contain"
                    />
                </div>
                <span class="font-serif font-bold text-xl text-gray-900"
                    >Masjid Al-Muttaqin</span
                >
            </a>
            <a href="/" class="text-gray-500 hover:text-gray-900 font-medium"
                >Kembali</a
            >
        </div>
    </nav>

    <!-- Content -->
    <main class="flex-grow container mx-auto px-4 py-12" in:fade>
        <div
            class="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100"
        >
            <div class="text-center mb-10">
                <div
                    class="inline-flex p-4 bg-indigo-50 rounded-2xl text-indigo-600 mb-6"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                    </svg>
                </div>
                <h1
                    class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4"
                >
                    Borang Penilaian Penceramah
                </h1>
                <p class="text-gray-600">
                    Sila isi borang di bawah untuk memberi maklum balas mengenai
                    penceramah kuliah.
                </p>
            </div>

            <!-- Placeholder for Form -->
            <div
                class="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200"
            >
                <p class="text-gray-500 italic">
                    Borang akan paparkan di sini.
                </p>
                <!-- Form implementation will go here -->
            </div>
        </div>
    </main>

    <footer
        class="bg-white border-t border-gray-100 py-6 text-center text-sm text-gray-500"
    >
        <p>
            &copy; {new Date().getFullYear()} Masjid Al-Muttaqin Wangsa Melawati
        </p>
    </footer>
</div>

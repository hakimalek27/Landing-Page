<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    let loaded = false;
    let prayerTimes: any = null;
    let nextPrayer = "";
    let timeToNextPrayer = "";

    onMount(async () => {
        loaded = true;
        try {
            const res = await fetch(
                "https://api.waktusolat.app/v2/solat/WLY01",
            );
            const data = await res.json();
            const today = new Date().getDate() - 1;
            prayerTimes = data.prayers[today];
            calculateNextPrayer();
            setInterval(calculateNextPrayer, 60000);
        } catch (e) {
            console.error("Error fetching prayer times:", e);
        }
    });

    function calculateNextPrayer() {
        if (!prayerTimes) return;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const prayers = [
            { name: "Subuh", time: prayerTimes.fajr },
            { name: "Zohor", time: prayerTimes.dhuhr },
            { name: "Asar", time: prayerTimes.asr },
            { name: "Maghrib", time: prayerTimes.maghrib },
            { name: "Isyak", time: prayerTimes.isha },
        ];

        let found = false;
        for (const prayer of prayers) {
            const [hours, minutes] = prayer.time.split(":").map(Number);
            const prayerMinutes = hours * 60 + minutes;

            if (prayerMinutes > currentMinutes) {
                nextPrayer = prayer.name;
                const diff = prayerMinutes - currentMinutes;
                const h = Math.floor(diff / 60);
                const m = diff % 60;
                timeToNextPrayer = `${h > 0 ? h + " jam " : ""}${m} minit`;
                found = true;
                return;
            }
        }

        if (!found) {
            nextPrayer = "Subuh (Esok)";
            timeToNextPrayer = "-";
        }
    }
</script>

<div
    class="min-h-screen bg-neutral-50 font-sans selection:bg-primary selection:text-white overflow-x-hidden"
>
    <!-- Hero Section -->
    <div
        class="relative w-full h-[500px] flex items-center justify-center overflow-hidden"
    >
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
            <img
                src="/images/masjid-bg.jpg"
                alt="Masjid Al-Muttaqin Background"
                class="w-full h-full object-cover"
            />
            <div
                class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-neutral-50"
            ></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 text-center px-4 mt-10">
            {#if loaded}
                <div
                    in:fly={{ y: 30, duration: 1000 }}
                    class="flex flex-col items-center"
                >
                    <div
                        class="bg-white rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-6 shadow-2xl animate-fade-in-up"
                    >
                        <img
                            src="/images/logo.png"
                            alt="Logo Masjid"
                            class="w-full h-full object-contain scale-[1.2]"
                        />
                    </div>
                    <h1
                        class="text-4xl md:text-6xl font-serif font-bold text-white mb-2 tracking-wide drop-shadow-lg"
                    >
                        Masjid Al-Muttaqin
                    </h1>
                    <p
                        class="text-lg md:text-xl text-gray-200 font-light tracking-widest uppercase mb-8"
                    >
                        Wangsa Melawati, Kuala Lumpur
                    </p>

                    <!-- Prayer Time Widget -->
                    {#if prayerTimes}
                        <div
                            class="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl max-w-md w-full mx-auto transform hover:scale-105 transition-all duration-500"
                        >
                            <div class="text-center mb-4">
                                <p
                                    class="text-secondary text-sm font-bold uppercase tracking-widest"
                                >
                                    Waktu Solat Seterusnya
                                </p>
                                <h3
                                    class="text-3xl font-serif font-bold text-white mt-1"
                                >
                                    {nextPrayer}
                                </h3>
                                <p class="text-gray-300 text-sm mt-1">
                                    {timeToNextPrayer}
                                </p>
                            </div>
                            <div
                                class="grid grid-cols-5 gap-2 text-center border-t border-white/10 pt-4"
                            >
                                {#each [{ name: "Subuh", time: prayerTimes.fajr }, { name: "Zohor", time: prayerTimes.dhuhr }, { name: "Asar", time: prayerTimes.asr }, { name: "Maghrib", time: prayerTimes.maghrib }, { name: "Isyak", time: prayerTimes.isha }] as prayer}
                                    <div class="flex flex-col">
                                        <span
                                            class="text-[10px] text-gray-400 uppercase"
                                            >{prayer.name}</span
                                        >
                                        <span
                                            class="text-xs font-bold text-white"
                                            >{prayer.time.slice(0, 5)}</span
                                        >
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    </div>

    <!-- System Cards Section -->
    <div
        class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- SSDA Card (Position 1) -->
            <a
                href="https://ssda.mamkl.my"
                class="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 block text-left"
            >
                <div
                    class="absolute top-0 left-0 w-full h-2 bg-secondary"
                ></div>
                <div class="p-8 md:p-10">
                    <div class="flex items-center justify-between mb-6">
                        <div
                            class="p-4 bg-secondary/10 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-500"
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
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <span
                            class="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wider"
                            >Aktif</span
                        >
                    </div>
                    <h2
                        class="text-3xl font-serif font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors"
                    >
                        SSDA
                    </h2>
                    <p
                        class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4"
                    >
                        Semakan Daftar Anak Kariah
                    </p>
                    <p class="text-gray-600 leading-relaxed mb-8">
                        Sistem semakan status keahlian dan pendaftaran baru anak
                        kariah Masjid Al-Muttaqin secara atas talian.
                    </p>
                    <div
                        class="inline-flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all duration-300 group-hover:text-secondary/80"
                    >
                        <span>Semak Data</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </div>
            </a>

            <!-- BPP Card (Position 2 - New) -->
            <a
                href="https://bpp.mamkl.my"
                class="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 block text-left"
            >
                <div
                    class="absolute top-0 left-0 w-full h-2 bg-indigo-600"
                ></div>
                <div class="p-8 md:p-10">
                    <div class="flex items-center justify-between mb-6">
                        <div
                            class="p-4 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500"
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
                        <span
                            class="px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider"
                            >Aktif</span
                        >
                    </div>
                    <h2
                        class="text-3xl font-serif font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors"
                    >
                        BPP
                    </h2>
                    <p
                        class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4"
                    >
                        Borang Penilaian Penceramah
                    </p>
                    <p class="text-gray-600 leading-relaxed mb-8">
                        Borang maklum balas dan penilaian kualiti penyampaian
                        penceramah kuliah dan tazkirah di masjid.
                    </p>
                    <div
                        class="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-4 transition-all duration-300 group-hover:text-indigo-500"
                    >
                        <span>Isi Borang</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </div>
            </a>

            <!-- SPKP Card (Position 3) -->
            <a
                href="https://spkp.mamkl.my"
                class="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 block text-left"
            >
                <div class="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                <div class="p-8 md:p-10">
                    <div class="flex items-center justify-between mb-6">
                        <div
                            class="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500"
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
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <span
                            class="px-4 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider"
                            >Aktif</span
                        >
                    </div>
                    <h2
                        class="text-3xl font-serif font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors"
                    >
                        SPKP
                    </h2>
                    <p
                        class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4"
                    >
                        Sistem Pengurusan Kelas Pengajian
                    </p>
                    <p class="text-gray-600 leading-relaxed mb-8">
                        Portal rasmi untuk pengurusan kehadiran, jadual kelas,
                        dan maklumat pelajar bagi semua kelas pengajian di
                        masjid.
                    </p>
                    <div
                        class="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300 group-hover:text-primary/80"
                    >
                        <span>Akses Sistem</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </div>
            </a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="w-full relative z-20 bg-black text-white">
        <!-- Decorative Top Border -->
        <div
            class="w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-100"
        ></div>

        <div class="pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto">
                <!-- Flex Layout for Footer Columns -->
                <div
                    class="flex flex-col md:flex-row justify-between gap-12 mb-12"
                >
                    <!-- Contact Section (Left) -->
                    <div
                        class="flex-1 flex flex-col items-center md:items-start text-center md:text-left min-w-[280px]"
                    >
                        <div
                            class="flex items-center gap-4 mb-6 justify-center md:justify-start"
                        >
                            <div
                                class="p-3 bg-white rounded-full text-primary shadow-[0_0_15px_rgba(255,255,255,0.3)] shrink-0"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    ><path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    /></svg
                                >
                            </div>
                            <h4
                                class="text-2xl font-serif font-bold text-secondary tracking-wide"
                            >
                                Hubungi Kami
                            </h4>
                        </div>

                        <div class="space-y-4 w-full">
                            <div
                                class="flex flex-col md:flex-row items-center md:items-start gap-2"
                            >
                                <span
                                    class="font-bold text-secondary text-sm uppercase tracking-wider bg-white/10 px-2 py-1 rounded min-w-[60px] text-center"
                                    >Tel</span
                                >
                                <span class="text-lg font-medium"
                                    >03-41317019 / 019-5998294</span
                                >
                            </div>
                            <div
                                class="flex flex-col md:flex-row items-center md:items-start gap-2"
                            >
                                <span
                                    class="font-bold text-secondary text-sm uppercase tracking-wider bg-white/10 px-2 py-1 rounded min-w-[60px] text-center"
                                    >Email</span
                                >
                                <a
                                    href="mailto:masjidalmuttaqin3@gmail.com"
                                    class="text-lg font-medium hover:text-secondary transition-colors border-b-2 border-transparent hover:border-secondary break-all"
                                    >masjidalmuttaqin3@gmail.com</a
                                >
                            </div>
                        </div>
                    </div>

                    <!-- Location Section (Center) -->
                    <div
                        class="flex-1 flex flex-col items-center text-center min-w-[280px]"
                    >
                        <div
                            class="flex items-center gap-4 mb-6 justify-center"
                        >
                            <div
                                class="p-3 bg-white rounded-full text-secondary shadow-[0_0_15px_rgba(255,255,255,0.3)] shrink-0"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    ><path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    /><path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    /></svg
                                >
                            </div>
                            <h4
                                class="text-2xl font-serif font-bold text-secondary tracking-wide"
                            >
                                Lokasi
                            </h4>
                        </div>
                        <p
                            class="text-white font-medium text-lg leading-relaxed mb-6"
                        >
                            Masjid Al-Muttaqin<br />
                            Wangsa Melawati,<br />
                            53300 Kuala Lumpur
                        </p>
                        <a
                            href="https://maps.app.goo.gl/nnez2SpEAbEcB2dV7"
                            target="_blank"
                            class="inline-flex items-center gap-2 text-base font-bold text-black bg-white hover:bg-secondary hover:text-black px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-secondary/50 transform hover:-translate-y-1"
                        >
                            <span>Buka di Google Maps</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                /></svg
                            >
                        </a>
                    </div>

                    <!-- Social Section (Right) -->
                    <div
                        class="flex-1 flex flex-col items-center md:items-end text-center md:text-right min-w-[280px]"
                    >
                        <div
                            class="flex items-center gap-4 mb-6 justify-center md:justify-end"
                        >
                            <div
                                class="p-3 bg-white rounded-full text-blue-600 shadow-[0_0_15px_rgba(255,255,255,0.3)] shrink-0"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    ><path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                    /></svg
                                >
                            </div>
                            <h4
                                class="text-2xl font-serif font-bold text-secondary tracking-wide"
                            >
                                Ikuti Kami
                            </h4>
                        </div>
                        <p class="text-white font-medium text-lg mb-4">
                            Dapatkan info terkini dan kuliah live.
                        </p>
                        <a
                            href="https://www.facebook.com/p/Masjid-Al-Muttaqin-Wangsa-Melawati-Kuala-Lumpur-100067347618857/"
                            target="_blank"
                            class="flex items-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 border-2 border-white/20"
                        >
                            <span class="font-bold text-lg tracking-wide"
                                >Facebook Rasmi</span
                            >
                        </a>
                    </div>
                </div>

                <div
                    class="border-t border-white/20 pt-8 text-center text-sm text-gray-400 font-medium tracking-wider uppercase"
                >
                    <p>
                        &copy; {new Date().getFullYear()} Masjid Al-Muttaqin Wangsa
                        Melawati <span class="mx-2 text-secondary">|</span> Hak Cipta
                        Terpelihara
                    </p>
                </div>
            </div>
        </div>
    </footer>
</div>

<style>
    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
    .animate-shimmer {
        animation: shimmer 8s linear infinite;
    }
    .animate-fade-in-up {
        animation: fadeInUp 1s ease-out forwards;
    }
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>

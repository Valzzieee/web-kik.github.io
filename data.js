/* =====================================================================
   DATA & PENGATURAN — file ini satu-satunya yang perlu kamu edit
   untuk memperbarui kondisi komputer.
   ===================================================================== */
(function () {
    'use strict';

    var LAB_COUNT = 10;     // jumlah lab
    var PC_PER_LAB = 40;    // jumlah komputer per lab

    /* Opsional: isi dengan URL (mis. Google Apps Script) agar laporan dari
       form dikirim ke spreadsheet. Kosong = laporan hanya disimpan di
       browser pengirim (localStorage). */
    var FORM_ENDPOINT = '';

    /* Hanya tulis komputer yang BERMASALAH. Komputer yang tidak ditulis
       otomatis berstatus "baik".
       status: 'diperbaiki' (kuning) atau 'rusak' (merah)
       CONTOH DATA — ganti dengan kondisi sebenarnya.                    */
    var PC_ISSUES = {
        1:  { 7:  { status: 'rusak',      note: 'Monitor tidak menyala.' },
              23: { status: 'diperbaiki', note: 'Penggantian RAM oleh teknisi.' },
              38: { status: 'rusak',      note: 'Keyboard tidak terbaca.' } },
        2:  { 4:  { status: 'diperbaiki', note: 'Instal ulang sistem operasi.' } },
        3:  { },
        4:  { 12: { status: 'rusak',      note: 'Tidak bisa masuk ke sistem (booting).' },
              13: { status: 'rusak',      note: 'Layar berkedip dan mati sendiri.' },
              29: { status: 'diperbaiki', note: 'Pembersihan dan penggantian kipas.' } },
        5:  { 2:  { status: 'rusak',      note: 'Mouse tidak berfungsi.' },
              33: { status: 'diperbaiki', note: 'Pemasangan ulang kabel jaringan.' } },
        6:  { 18: { status: 'rusak',      note: 'Komputer mati mendadak saat dipakai.' } },
        7:  { 9:  { status: 'diperbaiki', note: 'Penggantian power supply.' },
              10: { status: 'diperbaiki', note: 'Penggantian power supply.' } },
        8:  { 40: { status: 'rusak',      note: 'Port USB tidak berfungsi.' } },
        9:  { 16: { status: 'diperbaiki', note: 'Pemeriksaan hard disk.' },
              24: { status: 'rusak',      note: 'Tidak ada tampilan di monitor.' },
              31: { status: 'rusak',      note: 'Sangat lambat dan sering hang.' } },
        10: { 5:  { status: 'diperbaiki', note: 'Pembaruan sistem dan driver.' } }
    };

    var STATUS = {
        baik: {
            label: 'Baik',
            note: function (n) { return 'Komputer ' + n + ' dalam keadaan baik dan siap untuk digunakan.'; }
        },
        diperbaiki: {
            label: 'Sedang diperbaiki',
            note: function (n) { return 'Komputer ' + n + ' sedang ditangani teknisi. Pakai komputer lain dulu.'; }
        },
        rusak: {
            label: 'Rusak',
            note: function (n) { return 'Komputer ' + n + ' sedang rusak dan belum bisa digunakan.'; }
        }
    };

    function getPc(lab, n) {
        var issue = (PC_ISSUES[lab] || {})[n];
        var status = issue ? issue.status : 'baik';
        return {
            lab: lab,
            n: n,
            status: status,
            label: STATUS[status].label,
            note: STATUS[status].note(n) + (issue && issue.note ? ' ' + issue.note : '')
        };
    }

    function labSummary(lab) {
        var s = { baik: 0, diperbaiki: 0, rusak: 0, total: PC_PER_LAB };
        for (var n = 1; n <= PC_PER_LAB; n++) { s[getPc(lab, n).status]++; }
        return s;
    }

    function totalSummary() {
        var t = { baik: 0, diperbaiki: 0, rusak: 0, total: 0 };
        for (var l = 1; l <= LAB_COUNT; l++) {
            var s = labSummary(l);
            t.baik += s.baik; t.diperbaiki += s.diperbaiki; t.rusak += s.rusak; t.total += s.total;
        }
        return t;
    }

    window.KIK = {
        LAB_COUNT: LAB_COUNT,
        PC_PER_LAB: PC_PER_LAB,
        FORM_ENDPOINT: FORM_ENDPOINT,
        STATUS: STATUS,
        getPc: getPc,
        labSummary: labSummary,
        totalSummary: totalSummary
    };
})();

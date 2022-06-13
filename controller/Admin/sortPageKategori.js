const Kategori = require(`../../models/kategori`);

module.exports = {

    sortAdminKategoriKodeAtoZ: async (req, res) => {
        try {
            const kategori = await Kategori.findAll();

            let data = kategori.map((obj) => {
                return {
                    id: obj.id,
                    kode_ktr: obj.kode_ktr,
                    nama_kategori: obj.nama_kategori,
                    slug: obj.slug,              
                }
            })

            let result = data.sort((a,b) => {
                return b.kode_ktr.localeCompare(a.kode_ktr);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortAdminKategoriKodeZtoA: async (req, res) => {
        try {
            const kategori = await Kategori.findAll();

            let data = kategori.map((obj) => {
                return {
                    id: obj.id,
                    kode_ktr: obj.kode_ktr,
                    nama_kategori: obj.nama_kategori,
                    slug: obj.slug,              
                }
            })

            let result = data.sort((a,b) => {
                return a.kode_ktr.localeCompare(b.kode_ktr);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortingAdminKategoriAtoZ: async (req, res) => {
        try {
            const kategori = await Kategori.findAll();

            let data = kategori.map((obj) => {
                return {
                    id: obj.id,
                    kode_ktr: obj.kode_ktr,
                    nama_kategori: obj.nama_kategori,
                    slug: obj.slug,              
                }
            })

            let result = data.sort((a,b) => {
                return a.nama_kategori.localeCompare(b.nama_kategori);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortingAdminKategoriZtoA: async (req, res) => {
        try {
            const kategori = await Kategori.findAll();

            let data = kategori.map((obj) => {
                return {
                    id: obj.id,
                    kode_ktr: obj.kode_ktr,
                    nama_kategori: obj.nama_kategori,
                    slug: obj.slug,              
                }
            })

            let result = data.sort((a,b) => {
                return b.nama_kategori.localeCompare(a.nama_kategori);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },
     
    sortingIdAdminKategoriTerendah: async (req, res) => {
        try {
            const kategori = await Kategori.findAll();

            let data = kategori.map((obj) => {
                return {
                    id: obj.id,
                    kode_ktr: obj.kode_ktr,
                    nama_kategori: obj.nama_kategori,
                    slug: obj.slug
                }
            });

            let result = data.sort((a,b) => {
                return a.id - b.id;
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortingIdAdminKategoriTertinggi: async (req, res) => {
        try {
            const kategori = await Kategori.findAll();

            let data = kategori.map((obj) => {
                return {
                    id: obj.id,
                    kode_ktr: obj.kode_ktr,
                    nama_kategori: obj.nama_kategori,
                    slug: obj.slug
                }
            });

            let result = data.sort((a,b) => {
                return b.id - a.id;
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}
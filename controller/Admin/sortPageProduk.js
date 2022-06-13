const Kategori = require(`../../models/kategori`);
const Produk = require(`../../models/produk`);

module.exports = {

    sortingProdukKodeAtoZ: async (req, res) => {
        try {
            const produk = await Produk.findAll();

            let data = produk.map((obj) => {
                return {
                    kode_prd: obj.kode_prd,
                    nama_produk: obj.nama_produk,
                    desc: obj.desc,
                    harga: obj.harga,
                    image: obj.image,
                    slug: obj.slug,              
                }
            })

            for (let i = 0; i < produk.length; i++) {
                let a = await Kategori.findByPk(produk[i].id_kategori);

                data[i].kategori = a.nama_kategori;
            }
            let result = data.sort((a,b) => {
                return b.kode_prd.localeCompare(a.kode_prd);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortingProdukKodeZtoA: async (req, res) => {
        try {
            const produk = await Produk.findAll();

            let data = produk.map((obj) => {
                return {
                    kode_prd: obj.kode_prd,
                    nama_produk: obj.nama_produk,
                    desc: obj.desc,
                    harga: obj.harga,
                    image: obj.image,
                    slug: obj.slug,              
                }
            })

            for (let i = 0; i < produk.length; i++) {
                let a = await Kategori.findByPk(produk[i].id_kategori);

                data[i].kategori = a.nama_kategori;
            }
            let result = data.sort((a,b) => {
                return a.kode_prd.localeCompare(b.kode_prd);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortingNamaProdukAToZ: async (req, res) => {
        try {
            const produk = await Produk.findAll();

            let data = produk.map((obj) => {
                return {
                    kode_prd: obj.kode_prd,
                    nama_produk: obj.nama_produk,
                    desc: obj.desc,
                    harga: obj.harga,
                    image: obj.image,
                    slug: obj.slug,              
                }
            })

            for (let i = 0; i < produk.length; i++) {
                let a = await Kategori.findByPk(produk[i].id_kategori);

                data[i].kategori = a.nama_kategori;
            }
            let result = data.sort((a,b) => {
                return a.nama_produk.localeCompare(b.nama_produk);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortingNamaProdukZToA: async (req, res) => {
        try {
            const produk = await Produk.findAll();

            let data = produk.map((obj) => {
                return {
                    kode_prd: obj.kode_prd,
                    nama_produk: obj.nama_produk,
                    desc: obj.desc,
                    harga: obj.harga,
                    image: obj.image,
                    slug: obj.slug,              
                }
            })

            for (let i = 0; i < produk.length; i++) {
                let a = await Kategori.findByPk(produk[i].id_kategori);

                data[i].kategori = a.nama_kategori;
            }

            let result = data.sort((a,b) => {
                return b.nama_produk.localeCompare(a.nama_produk);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },


    sortingHargaProdukTerendah: async (req, res) => {
        try {
            const produk = await Produk.findAll();

            let data = produk.map((obj) => {
                return {
                    kode_prd: obj.kode_prd,
                    nama_produk: obj.nama_produk,
                    desc: obj.desc,
                    harga: obj.harga,
                    image: obj.image,
                    slug: obj.slug,              
                }
            })

            for (let i = 0; i < produk.length; i++) {
                let a = await Kategori.findByPk(produk[i].id_kategori);

                data[i].kategori = a.nama_kategori;
            }

            let result = data.sort((a,b) => {
                return a.harga - b.harga;
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortingHargaProdukTertinggi: async (req, res) => {
        try {
            const produk = await Produk.findAll();

            let data = produk.map((obj) => {
                return {
                    kode_prd: obj.kode_prd,
                    nama_produk: obj.nama_produk,
                    desc: obj.desc,
                    harga: obj.harga,
                    image: obj.image,
                    slug: obj.slug,              
                }
            })

            for (let i = 0; i < produk.length; i++) {
                let a = await Kategori.findByPk(produk[i].id_kategori);

                data[i].kategori = a.nama_kategori;
            }

            let result = data.sort((a,b) => {
                return b.harga - a.harga;
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortingKategoriAtoZ: async (req, res) => {
        try {
            const produk = await Produk.findAll();

            let data = produk.map((obj) => {
                return {
                    kode_prd: obj.kode_prd,
                    nama_produk: obj.nama_produk,
                    desc: obj.desc,
                    harga: obj.harga,
                    image: obj.image,
                    slug: obj.slug,              
                }
            })

            for (let i = 0; i < produk.length; i++) {
                let a = await Kategori.findByPk(produk[i].id_kategori);

                data[i].kategori = a.nama_kategori;
            }

            let result = data.sort((a,b) => {
                return a.kategori.localeCompare(b.kategori);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortingKategoriZtoA: async (req, res) => {
        try {
            const produk = await Produk.findAll();

            let data = produk.map((obj) => {
                return {
                    kode_prd: obj.kode_prd,
                    nama_produk: obj.nama_produk,
                    desc: obj.desc,
                    harga: obj.harga,
                    image: obj.image,
                    slug: obj.slug,              
                }
            })

            for (let i = 0; i < produk.length; i++) {
                let a = await Kategori.findByPk(produk[i].id_kategori);

                data[i].kategori = a.nama_kategori;
            }

            let result = data.sort((a,b) => {
                return b.kategori.localeCompare(a.kategori);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

}
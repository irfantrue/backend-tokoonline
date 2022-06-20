const Kategori = require(`../models/kategori`);
const Produk = require(`../models/produk`);

module.exports = {

    sortingNamaProdukByKategoriAToZ: async (req, res) => {
        try {
            const kategori = await Kategori.findOne({ where: { slug: req.params.slug } });
            
            const produk = await Produk.findAll({ where: { id_kategori: kategori.id } });

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

    sortingNamaProdukByKategoriZToA: async (req, res) => {
        try {
            const kategori = await Kategori.findOne({ where: { slug: req.params.slug } });
            
            const produk = await Produk.findAll({ where: { id_kategori: kategori.id } });

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


    sortingHargaProdukByKategoriTerendah: async (req, res) => {
        try {
            const kategori = await Kategori.findOne({ where: { slug: req.params.slug } });
            
            const produk = await Produk.findAll({ where: { id_kategori: kategori.id } });

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

    sortingHargaProdukByKategoriTertinggi: async (req, res) => {
        try {
            const kategori = await Kategori.findOne({ where: { slug: req.params.slug } });
            
            const produk = await Produk.findAll({ where: { id_kategori: kategori.id } });

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
}
const Transaksi = require(`../../models/transaksi`);
const Users = require(`../../models/userdb`);
const Produk = require(`../../models/produk`);

module.exports = {

    sortTransaksiAdminProdukAtoZ: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            let data = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                let b = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan data image produk
                data[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                data[i].phone = a.phone;
                                
                // Menambahkan data alamat original user
                data[i].alamat_user = a.address;
                
                // Menambahkan data email user
                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return a.nama_produk.localeCompare(b.nama_produk);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTransaksiAdminProdukZtoA: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            let data = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                let b = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan data image produk
                data[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                data[i].phone = a.phone;
                                
                // Menambahkan data alamat original user
                data[i].alamat_user = a.address;
                
                // Menambahkan data email user
                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return b.nama_produk.localeCompare(a.nama_produk);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTransaksiAdminPelangganAtoZ: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            let data = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                let b = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan data image produk
                data[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                data[i].phone = a.phone;
                                
                // Menambahkan data alamat original user
                data[i].alamat_user = a.address;
                
                // Menambahkan data email user
                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return a.fullname.localeCompare(b.fullname);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTransaksiAdminPelangganZtoA: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            let data = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                let b = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan data image produk
                data[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                data[i].phone = a.phone;
                                
                // Menambahkan data alamat original user
                data[i].alamat_user = a.address;
                
                // Menambahkan data email user
                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return b.fullname.localeCompare(a.fullname);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTransaksiAdminTanggalTerbaru: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            let data = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                let b = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan data image produk
                data[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                data[i].phone = a.phone;
                                
                // Menambahkan data alamat original user
                data[i].alamat_user = a.address;
                
                // Menambahkan data email user
                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return b.createdAt.localeCompare(a.createdAt);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTransaksiAdminTanggalTerlama: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            let data = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                let b = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan data image produk
                data[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                data[i].phone = a.phone;
                                
                // Menambahkan data alamat original user
                data[i].alamat_user = a.address;
                
                // Menambahkan data email user
                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return a.createdAt.localeCompare(b.createdAt);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTransaksiAdminTotalHargaTertinggi: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            let data = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                let b = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan data image produk
                data[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                data[i].phone = a.phone;
                                
                // Menambahkan data alamat original user
                data[i].alamat_user = a.address;
                
                // Menambahkan data email user
                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return b.total_harga - a.total_harga;
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTransaksiAdminTotalHargaTerendah: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            let data = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                let b = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan data image produk
                data[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                data[i].phone = a.phone;
                                
                // Menambahkan data alamat original user
                data[i].alamat_user = a.address;
                
                // Menambahkan data email user
                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return a.total_harga - b.total_harga;
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTransaksiAdminStatusAToZ: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            let data = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                let b = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan data image produk
                data[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                data[i].phone = a.phone;
                                
                // Menambahkan data alamat original user
                data[i].alamat_user = a.address;
                
                // Menambahkan data email user
                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return a.status.localeCompare(b.status);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTransaksiAdminStatusZToA: async (req, res) => {
        try {
            const transaksi = await Transaksi.findAll();

            let data = transaksi.map((obj) => {
                return {
                    id: obj.id,
                    id_user: obj.id_user,
                    jumlah: obj.jumlah,
                    alamat_tujuan: obj.alamat_tujuan,
                    tgl_pengiriman: obj.tgl_pengiriman.toLocaleDateString(),
                    pembayaran: obj.pembayaran,
                    harga: obj.harga,
                    total_harga: obj.total_harga,
                    status: obj.status,
                    createdAt: obj.createdAt.toLocaleDateString()
                }
            });

            for (let i = 0; i < transaksi.length; i++) {
                let a = await Users.findByPk(transaksi[i].id_user);

                let b = await Produk.findByPk(transaksi[i].id_produk);

                // Menambahkan data image produk
                data[i].nama_produk = b.nama_produk;

                // Menambahkan data phone pelanggan
                data[i].phone = a.phone;
                                
                // Menambahkan data alamat original user
                data[i].alamat_user = a.address;
                
                // Menambahkan data email user
                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return b.status.localeCompare(a.status);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}
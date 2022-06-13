const Users = require(`../../models/userdb`);
const Pembayaran = require(`../../models/pembayaran`);

module.exports = {

    sortPembayaranKodeAtoZ: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return b.kode_pby.localeCompare(a.kode_pby);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortPembayaranKodeZtoA: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return a.kode_pby.localeCompare(b.kode_pby);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },
    
    sortDetailAToZ: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return a.desc.localeCompare(b.desc);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortDetailZToA: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return b.desc.localeCompare(a.desc);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTeleponTerendah: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return a.phone.localeCompare(b.phone);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortTeleponTertinggi: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

                data[i].fullname = a.fullname;
            };

            let result = data.sort((a,b) => {
                return b.phone.localeCompare(a.phone);
            });

            return res.json({ status: 200, data: result });
        } catch (error) {
            return res.status(500).json({ msg: `Invalid` });
        }
    },

    sortNamaAToZ: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

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

    sortNamaZToA: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

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

    sortTotalHargaTertinggi: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

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

    sortTotalHargaTerendah: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

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

    sortStatusAToZ: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

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

    sortStatusZToA: async (req, res) => {
        try {
            const pembayaran = await Pembayaran.findAll();

            if (pembayaran.length == 0) return res.json({ status: 404, msg: `Data Not Found` });

            let data = pembayaran.map((obj) => {
                return {
                    id: obj.id,
                    kode_pby: obj.kode_pby,
                    desc: obj.desc,
                    image: obj.image,
                    total_harga: obj.total_harga,
                    status: obj.status
                }
            });

            for (let i = 0; i < pembayaran.length; i++) {
                let a = await Users.findByPk(pembayaran[i].id_user);

                data[i].email = a.email

                data[i].phone = a.phone;

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
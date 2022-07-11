const Validator = require(`fastest-validator`);
const v = new Validator();
const Pembayaran = require(`../../models/pembayaran`);

module.exports = {

    tambahOngkir: async (req, res) => {
        try {
            const {
                ongkir
            } = req.body;

            const schema = {
                ongkir: `number|empty:false`
            };

            const check = v.compile(schema);

            const result = check({
                ongkir: ongkir
            });

            if (result != true) return res.json({ status: 400, msg: `Data Ongkir Kosong` });

            const {id} = req.params;

            const pembayaran = await Pembayaran.findByPk(id);

            if (!pembayaran) return res.json({ staus: 404, msg: `Data Not Found`});

            if (pembayaran.ongkir <= ongkir || !pembayaran.ongkir === ongkir) {
                pembayaran.total_harga += ongkir;
            } else {
                pembayaran.ongkir -= ongkir;
                pembayaran.total_harga -= pembayaran.ongkir;
            }

            await pembayaran.update({
                ongkir: ongkir,
                total_harga: pembayaran.total_harga,
            });

            return res.json({ status: 200, msg: `Berhasil update` });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}
const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController {
    static async showToughts(req, res) {
        res.render('toughts/home');
    }

    static async dashboard(req, res) {
        const userid = req.session.userid;

        const user = await User.findOne({
            where: { id: userid },
            include: Tought,
            plain: true
        })

        if (!user) {
            res.redirect('/login');
        }

        let emptyToughts = false;

        const toughts = user.Toughts.map((result) => result.dataValues)

        if (toughts.length === 0) {
            emptyToughts = true;
        }

        res.render('toughts/dashboard', { toughts, emptyToughts });
    }

    static createTought(req, res) {
        res.render('toughts/create');
    }

    static async createToughtSave(req, res) {

        const tought = {
            UserId: req.session.userid,
            title: req.body.title,
        }

        try {
            await Tought.create(tought);
            req.flash('message', 'Criado com sucesso');

            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })

        } catch (error) {
            console.log(error);
        }

    }

    static async removeTought(req, res) {
        const id = req.body.id;
        const UserId = req.session.userid;

        try {
            await Tought.destroy({ where: { id: id, UserId: UserId } });
            req.flash('message', 'Removido com sucesso!');
            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        } catch (error) {
            console.log(error);
        }
    }
}
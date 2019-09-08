import Sessoes from '../models/Sessoes';

export async function createSessoes(req,res){
    try{
        const { id_filme, id_cinema, no_sala, date } = req.body;
        // console.log(req.body);
        // res.send('OKOKOK RECIVIDO SessoesS ');

        let newSessoes = await Sessoes.create({ id_filme, id_cinema, no_sala, date },
        { fields: ['id_filme', 'id_cinema', 'no_sala', 'date'] });
        
        res.json({ message: 'NOVA SECÃO FOI CRIADA ', newSessoes });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'TEMOS UM ERRO ',
            data: {},
        })
    }
}

export async function getSessoess(req, res) {
    const sessoes = await Sessoes.findAll({
        attributes: ['id_filme', 'id_cinema', 'no_sala', 'date'],
        order: [ ['id', 'DESC'] ]
    });
    res.json({ sessoes });
}

export async function getOneSessoes(req, res) {
    const { id } = req.params;
    try {
        const sessoes = await Sessoes.findOne({
            where: { id },
            attributes: ['id_filme', 'id_cinema', 'no_sala', 'date']
        });
        res.json({ sessoes });
    } catch (e) {
        console.log(e);
    }
};

export async function deleteSessoes(req, res) {
    const { id } = req.params;
    try {
        const sessoesDeleted = await Sessoes.destroy({
            where: { id }
        });
        res.json({ message: 'Sessoes Deleted' })
    } catch (e) {
        console.log(e);
    }
};

export async function updateSessoes(req, res) {
    const { id } = req.params;
    const { id_filme, id_cinema, no_sala, date } = req.body;
    try {
        const sessoes = await Sessoes.findOne({
            attributes: ['id_filme', 'id_cinema', 'no_sala', 'date'],
            where: { id }
        });
        const updatedSessoes = await Sessoes.update(
            { id_filme, id_cinema, no_sala, date },
            { where: { id } }
        )
        res.json({ message: 'Sessoes Updated', updatedSessoes });
    } catch (e) {
        console.log(e);
    }
};

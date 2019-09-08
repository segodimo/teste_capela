import Cinema from '../models/Cinema';

export async function createCinema(req,res){
    try{
        const { nome, cidade, salas } = req.body;
        // console.log(req.body);
        // res.send('OKOKOK RECIVIDO CinemaS ');

        let newCinema = await Cinema.create({ nome, cidade, salas },
        { fields: ['nome', 'cidade', 'salas'] });
        
        res.json({ message: 'NOVO CINEMA FOI CRIADO ', newCinema });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'TEMOS UM ERROR ',
            data: {},
        })
    }
}

export async function getCinemas(req, res) {
    const cinema = await Cinema.findAll({
        attributes: ['nome', 'cidade', 'salas'],
        order: [ ['id', 'DESC'] ]
    });
    res.json({ cinema });
}

export async function getOneCinema(req, res) {
    const { id } = req.params;
    try {
        const cinema = await Cinema.findOne({
            where: { id },
            attributes: ['nome', 'cidade', 'salas']
        });
        res.json({ cinema });
    } catch (e) {
        console.log(e);
    }
};

export async function deleteCinema(req, res) {
    const { id } = req.params;
    try {
        const cinemaDeleted = await Cinema.destroy({
            where: { id }
        });
        res.json({ message: 'Cinema Deleted' })
    } catch (e) {
        console.log(e);
    }
};

export async function updateCinema(req, res) {
    const { id } = req.params;
    const { nome, cidade, salas } = req.body;
    try {
        const cinema = await Cinema.findOne({
            attributes: ['nome', 'cidade', 'salas'],
            where: { id }
        });
        const updatedCinema = await Cinema.update(
            { nome, cidade, salas },
            { where: { id } }
        )
        res.json({ message: 'Cinema Updated', updatedCinema });
    } catch (e) {
        console.log(e);
    }
};

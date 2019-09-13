import Filme from '../models/Filme';

export async function createFilme(req,res){
    try{
        const { nome, genero, duracao, classificacao, lancamento, sinopse } = req.body;
        // console.log(req.body);
        // res.send('OKOKOK RECIVIDO FILMES ');

        let newFilme = await Filme.create({ nome, genero, duracao, classificacao, lancamento, sinopse },
        { fields: ['nome', 'genero', 'duracao', 'classificacao', 'lancamento', 'sinopse'] });
        
        res.json({ message: 'NOVO FILME FOI CRIADO ', newFilme });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'TEMOS UM ERROR ',
            data: {},
        })
    }
}

export async function getFilmes(req, res) {
    const filmes = await Filme.findAll({
        attributes: ['id', 'nome', 'genero', 'duracao', 'classificacao', 'lancamento', 'sinopse'],
        order: [ ['nome', 'ASC'] ]
    });
    res.json({ filmes });
}

export async function getOneFilme(req, res) {
    const { id } = req.params;
    try {
        const filme = await Filme.findOne({
            where: { id },
            attributes: ['id', 'nome', 'genero', 'duracao', 'classificacao', 'lancamento', 'sinopse']
        });
        res.json({ filme });
    } catch (e) {
        console.log(e);
    }
};

export async function deleteFilme(req, res) {
    const { id } = req.params;
    try {
        const filmeDeleted = await Filme.destroy({
            where: { id }
        });
        res.json({ message: 'Filme Deleted' })
    } catch (e) {
        console.log(e);
    }
};

export async function updateFilme(req, res) {
    const { id } = req.params;
    const { nome, genero, duracao, classificacao, lancamento, sinopse } = req.body;
    try {
        const filme = await Filme.findOne({
            attributes: ['id', 'nome', 'genero', 'duracao', 'classificacao', 'lancamento', 'sinopse'],
            where: { id }
        });
        const updatedFilme = await Filme.update(
            { nome, genero, duracao, classificacao, lancamento, sinopse },
            { where: { id } }
        )
        res.json({ message: 'Filme Updated', updatedFilme });
    } catch (e) {
        console.log(e);
    }
};

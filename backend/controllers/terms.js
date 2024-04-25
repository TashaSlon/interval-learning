const Term = require('../models/term');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const NotAllowError = require('../errors/not-allow-err');

module.exports.createTerm = (req, res, next) => {
  const { name } = req.body;

  Term.create(
    {
      name, owner: req.user._id,
    },
  )
    .then((term) => res.status(201).send(term))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.getTerms = (req, res, next) => {
  Term.find({})
    .then((term) => res.send(term))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteTerm = (req, res, next) => {
  Term.findById(req.params.termId)
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((term) => {
      if (term.owner.toString() === req.user._id) {
        Term.findByIdAndRemove(req.params.termId)
          .then((item) => res.send(item))
          .catch((err) => {
            next(err);
          });
      } else {
        next(new NotAllowError('Невозможно удалить чужую карточку'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

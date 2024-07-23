const Question = require('../models/question');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const NotAllowError = require('../errors/not-allow-err');

const now = new Date();

module.exports.createQuestion = (req, res, next) => {
  const { question, answer, term } = req.body;
  console.log(req.body);

  Question.create(
    {
      question, answer, term, owner: req.user._id, lastDate: 0, nextDate: now.getTime(),
    },
  )
    .then((quest) => res.status(201).send(quest))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании вопроса'));
      } else {
        next(err);
      }
    });
};

module.exports.getQuestions = (req, res, next) => {
  Question.find({})
    .then((questions) => res.send(questions))
    .catch((err) => {
      next(err);
    });
};

module.exports.getQuestionsForRepeat = (req, res, next) => {
  Question.find({ nextDate: { $lte: now.getTime() } })
    .then((quest) => res.send(quest))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteQuestion = (req, res, next) => {
  Question.findById(req.params.questionId)
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((term) => {
      if (term.owner.toString() === req.user._id) {
        Question.findByIdAndRemove(req.params.questionId)
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

module.exports.setQuestionDone = (req, res, next) => {
  Question.findByIdAndUpdate(
    req.params.id,
    {
      lastDate: new Date().getTime(),
      nextDate: new Date().getTime() + 259200000,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError('Вопрос с указанным id не существует'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при обновлении вопроса'));
      } else {
        next(err);
      }
    });
};

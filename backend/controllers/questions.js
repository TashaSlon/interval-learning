const Question = require('../models/question');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const NotAllowError = require('../errors/not-allow-err');

const now = new Date();
// const currentDay = now.getDate() + 1;
// const currentMonth = now.getMonth() + 1;
// const currentYear = now.getFullYear();
// const today = new Date(`${currentYear}-${currentMonth}-${currentDay}`);
const tommorow = new Date().getTime() + 86400000;

function getNextRepeat(repeatCount) {
  if (repeatCount === 0) return 86400000;
  if (repeatCount === 1) return 86400000 * 3;
  if (repeatCount === 2) return 86400000 * 5;
  if (repeatCount === 3) return 86400000 * 10;
  if (repeatCount === 4) return 86400000 * 3 * 7;
  if (repeatCount === 5) return 86400000 * 2 * 30;
  if (repeatCount > 5) return 86400000 * 6 * 30;
  return 86400000;
}

module.exports.createQuestion = (req, res, next) => {
  const { question, answer, term } = req.body;

  Question.create(
    {
      question, answer, term, owner: req.user._id, lastDate: 0, nextDate: tommorow, repeatCount: 0,
    },
  )
    .then((quest) => res.status(201).send(quest))
    .catch((err) => {
      console.log(err);
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
  Question.findById(req.params.id)
    .orFail(() => new NotFoundError('Вопрос не найден, либо был удален'))
    .then((question) => {
      Question.findByIdAndUpdate(
        question._id,
        {
          lastDate: new Date().getTime(),
          nextDate: new Date().getTime() + getNextRepeat(question.repeatCount),
          repeatCount: question.repeatCount + 1,
        },
        {
          new: true,
          runValidators: true,
        },
      )
        .orFail(() => new NotFoundError('Вопрос не найден, либо был удален'))
        .then((user) => res.send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Некорректные данные при обновлении вопроса'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

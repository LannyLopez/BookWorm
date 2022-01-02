const router = require('express').Router();
const { Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/',  withAuth, async (req, res) => {

    try {
        const dbReviewData = await Review.findAll({
            include: [
                {
                model: Review,
                attributes: ['username', 'comment'],
                },
            ],
        }),

        const reviews = dbReviewData.map((review) => {
            review.get({ plain: true})
        });

        res.render('homepage', {
            reviews,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

// router.get('/review/:id', withAuth, async (req, res) => {
//     try {
//       const dbSingleReviewData = await Review.findByPk(req.params.id);
  
//       const singleReview = dbSingleReviewData.get({ plain: true });
  
//       res.render('review', { singleReview, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });
  
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});
  
  module.exports = router;
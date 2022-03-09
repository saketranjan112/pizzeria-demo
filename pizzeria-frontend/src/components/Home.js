import React from 'react'

export default function Home() {
  return (
    <div className="container p-5 text-start">
      <p className="display-6 text-center">Our Story</p>
      <p>We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Pizzeria's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!</p>
      <p>Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist the softest, cheesiest, crunchiest, butteriest Domino's Fresh Pan Pizza. They have been leaving the stage in the middle of a performance and even finding excuses to be disqualified in a football match.</p>
      <p>We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Domino's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!</p>
      <div className="row my-2">
        <div className="col-6">
          <img src='https://image.shutterstock.com/z/stock-photo-raw-dough-for-pizza-with-ingredients-and-spices-on-table-526830277.jpg' alt="..." style={{"width": 400, "height": 300}}/>
        </div>
        <div className="col-6 mt-5">
          <p className="fs-4 mt-2">Ingredients</p>
          <p>We're ruthless about goodness. We have no qualms about tearing up a day-old lettuce leaf (straight from the farm), or steaming a baby (carrot). Cut. Cut. Chop Chop. Steam. Steam. Stir Stir. While they're still young and fresh - that's our motto. It makes the kitchen a better place.</p>
        </div>
      </div>
      <div className="row my-2">
      <div className="col-6 mt-5">
          <p className="fs-4 mt-2">Our Chefs</p>
          <p>They make sauces sing and salads dance. They create magic with Skill, knowledge, passion, and stirring spoons (among other things). They make goodness so good, it doesn't know what to do with itself. We do though. We send it to you.</p>
        </div>
        <div className="col-6 text-end">
          <img src='https://image.shutterstock.com/z/stock-photo-happy-chef-437116033.jpg' alt="..." style={{"width": 400, "height": 300}}/>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-6">
          <img src='https://image.shutterstock.com/z/stock-photo-vintage-analog-kitchen-countdown-timer-with-classical-clock-face-and-red-remaining-time-display-669255388.jpg' alt='...' style={{"width": 400, "height": 300}}/>
        </div>
        <div className="col-6 mt-5">
          <p className="display-4 mt-5 ">45 min Delivery</p>
        </div>
        
      </div>
    </div>
  )
}

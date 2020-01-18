var whichPartnerQuestionID = "108";
var satisfactionQuestionID = "79";
var aggregateSurveyResults = $('#partner-satisfaction-survey-results');

function findPartnerQuestion(questionID) {
  var foundPartnerQuestion;
  aggregateSurveyResults.children('.partner-satisfaction-survey-question').each(function(){
    var currentQuestionID = $(this).children('.partner-satisfaction-survey-question-id').html();
    if (currentQuestionID == questionID) {
      foundPartnerQuestion = $(this);
      return false;
    }
  });
  return foundPartnerQuestion;
}

function getSignupsFromResult(question, result) {
  var signupsArray = [];
  question.find('.partner-satisfaction-survey-response-name').each(function(){
    if ($(this).html() == result) {
      signupsArray.push($(this).prev().prev().html());
    }
  });
  return signupsArray;
}

function getResultFromSignup(question, signupID) {
  var resultFromSignup;
  
  question.find('.partner-satisfaction-survey-response-signup').each(function(){
    if ($(this).html() == signupID) {
      resultFromSignup = $(this).next('.partner-satisfaction-survey-response-id').html();
      return false;
    }
  });
  return resultFromSignup;
}

function translatePartnerRating(rawRating) {
  switch(parseInt(rawRating)) {
    case 110:
      return 5;
    case 111:
      return 4;
    case 112:
      return 3;
    case 113:
      return 2;
    case 114:
      return 1;
    default:
      return 0;
  }
}

function averageValueOfArray(numberArray) {
  var arrayLength = numberArray.length;
  var arrayTotal = 0;
  var adjustedArrayLength = arrayLength;
  for (var i=0;i<arrayLength;i++) {
    if (numberArray[i] == 0) {
      adjustedArrayLength -= 1; // 0 ratings mean that the satisfaction question was not answered
    } else {
      arrayTotal += numberArray[i];
    }
  }
  return [arrayTotal/adjustedArrayLength, adjustedArrayLength];
}

function ratePartner(currentPartner) {
  
  var whichPartnerQuestion = findPartnerQuestion(whichPartnerQuestionID);
  var satisfactionQuestion = findPartnerQuestion(satisfactionQuestionID);
  var partnerCustomers = getSignupsFromResult(whichPartnerQuestion,currentPartner);
  var resultsArray = [];
  var partnerRatings = [];
  
  for (var i=0;i<partnerCustomers.length;i++) {
    resultsArray.push(getResultFromSignup(satisfactionQuestion,partnerCustomers[i]));
  }
  
  for (var j=0;j<resultsArray.length;j++) {
    partnerRatings.push(translatePartnerRating(resultsArray[j]));
  }
  
  var normalizedResults = averageValueOfArray(partnerRatings);
  
  return [normalizedResults[0],normalizedResults[1]];
  
}

function initPartnerRatingSystem() {
  console.log('initiate rating');
  
  var ratingStarsContainer = $('.partner-rating-container');
  var starsContainerWidth = 89;
  
  ratingStarsContainer.each(function(){
    var partnerHeadline = $(this).prev('.partner-headline-container').find('.partner-headline-hidden').html();
    var starsFilledContainer = $(this).find('.partner-rating-stars-filled');
    var starsCountContainer = $(this).find('.partner-rating-stars-count');
    var ratingSystemOutput = ratePartner(partnerHeadline);
    var ratingSystemRating = ratingSystemOutput[0];
    var ratingSystemCount = ratingSystemOutput[1];
    
    if (ratingSystemRating) {
      $(this).css('display','inline-block');
      starsFilledContainer.css('width',starsContainerWidth*(ratingSystemRating/5)+'px');
      starsCountContainer.html(ratingSystemCount + (ratingSystemCount == 1 ? " review":" reviews"));
    }
    else {
      $(this).css('display','inline-block');
      starsCountContainer.html('0 reviews');
    }
    
  });
  
}

initPartnerRatingSystem();
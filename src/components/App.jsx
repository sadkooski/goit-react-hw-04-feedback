import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';
import { Section } from 'components/Section/Section';
import React, { useState } from 'react';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    if (countTotalFeedback() > 1) {
      return Math.ceil((feedback.good / countTotalFeedback()) * 100);
    }
  };

  const buttonOnClick = e => {
    const variant = e.currentTarget.dataset.variant;

    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [variant]: prevFeedback[variant] + 1,
    }));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div className="feedback">
        <Section title="Please leave feedback"></Section>
        <FeedbackOptions onLeaveFeedback={buttonOnClick} />
        <Section title="Statistics"></Section>
        {feedback.total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </div>
    </div>
  );
};

export default App;

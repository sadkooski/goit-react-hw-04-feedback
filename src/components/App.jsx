import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';
import { Section } from 'components/Section/Section';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    positiveFeedback: 0,
  });

  const countTotalFeedback = () => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      total: prevFeedback.good + prevFeedback.neutral + prevFeedback.bad,
    }));
  };

  useEffect(() => {
    const countPositiveFeedbackPercentage = () => {
      if (feedback.total > 1) {
        setFeedback(prevFeedback => ({
          ...prevFeedback,
          positiveFeedback: Math.ceil(
            (prevFeedback.good / prevFeedback.total) * 100
          ),
        }));
      }
    };

    countTotalFeedback();
    countPositiveFeedbackPercentage();
  }, [feedback]);

  const buttonOnClick = e => {
    e.preventDefault();
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
            total={feedback.total}
            positivePercentage={feedback.positiveFeedback}
          />
        )}
      </div>
    </div>
  );
};

export default App;

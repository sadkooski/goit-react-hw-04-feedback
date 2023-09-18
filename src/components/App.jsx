import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';
import { Section } from 'components/Section/Section';
import React, { useState, useEffect } from 'react';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    positiveFeedback: 0,
  });

  useEffect(() => {
    const countTotalFeedback = () => {
      const { good, neutral, bad, total } = feedback;
      setFeedback(prevFeedback => ({
        ...prevFeedback,
        total: good + neutral + bad,
      }));
    };
  }, [feedback]);

  useEffect(() => {
    const countPositiveFeedbackPercentage = () => {
      const { good, total, positiveFeedback } = feedback;

      if (total > 1) {
        setFeedback(prevFeedback => ({
          ...prevFeedback,
          positiveFeedback: Math.ceil((good / total) * 100),
        }));
      }
    };
  });

  const buttonOnClick = e => {
    e.preventDefault();
    const variant = e.currentTarget.dataset.variant;

    setFeedback(
      prevFeedback => ({
        ...prevFeedback,
        [variant]: prevFeedback[variant] + 1,
      }),
      () => {
        countPositiveFeedbackPercentage();
        countTotalFeedback();
      }
    );
  };
  const notificationVisibility = () => {
    const { total } = feedback;
    return total === 0;
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
        {notificationVisibility() ? (
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

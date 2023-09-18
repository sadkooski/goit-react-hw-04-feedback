import './Feedback.css';
import React, { Component } from 'react';
import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';
import { Section } from 'components/Section/Section';
import { useState } from 'react';

class FeedbackTemplate extends Component {
  constructor() {
    super();

    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
      total: 0,
      positiveFeedback: 0,
    };
  }

  buttonOnClick = e => {
    e.preventDefault();
    const variant = e.currentTarget.dataset.variant;
    this.setState(
      prevState => ({
        [variant]: prevState[variant] + 1,
      }),
      () => {
        this.countPositiveFeedbackPercentage();
        this.countTotalFeedback();
      }
    );
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    this.setState({
      total: good + neutral + bad,
    });
  };

  countPositiveFeedbackPercentage = () => {
    if (this.state.total > 1) {
      this.setState({
        positiveFeedback: Math.ceil((this.state.good / this.state.total) * 100),
      });
    }
  };

  notificationVisibility = () => {
    const { total } = this.state;
    return total === 0;
  };

  render() {
    return (
      <div className="feedback">
        <Section title="Please leave feedback"></Section>
        <FeedbackOptions onLeaveFeedback={this.buttonOnClick} />
        <Section title="Statistics"></Section>
        {this.state.total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={this.state.good}
            neutral={this.state.neutral}
            bad={this.state.bad}
            total={this.state.total}
            positivePercentage={this.state.positiveFeedback}
          />
        )}
      </div>
    );
  }
}

export default FeedbackTemplate;

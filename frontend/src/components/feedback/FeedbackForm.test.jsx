import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import FeedbackForm from './FeedbackForm';

describe('FeedbackForm', () => {
  test('submits the feedback text and selected rating, then resets the form', async () => {
    const submitFeedback = vi.fn().mockResolvedValue({});
    render(<FeedbackForm submitFeedback={submitFeedback} />);

    fireEvent.change(screen.getByLabelText('Your Feedback'), {
      target: { value: 'Clear and helpful session.' },
    });
    fireEvent.change(screen.getByLabelText('Rate your session'), {
      target: { value: '5' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit Feedback' }));

    await waitFor(() => {
      expect(submitFeedback).toHaveBeenCalledWith({
        text: 'Clear and helpful session.',
        rating: '5',
      });
      expect(screen.getByLabelText('Your Feedback')).toHaveValue('');
      expect(screen.getByLabelText('Rate your session')).toHaveValue('');
    });
  });

  test('does not submit blank feedback', () => {
    const submitFeedback = vi.fn();
    render(<FeedbackForm submitFeedback={submitFeedback} />);

    fireEvent.click(screen.getByRole('button', { name: 'Submit Feedback' }));

    expect(submitFeedback).not.toHaveBeenCalled();
  });
});

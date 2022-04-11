import React from 'react';
import { config } from 'react-transition-group';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { AutoComplete, AutoCompleteProps } from './autoComplete';

config.disabled = true;

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
];
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};

let inputNode: HTMLInputElement;
const setup = () => {
  render(<AutoComplete {...testProps} />);
  inputNode = screen.getByPlaceholderText('auto-complete') as HTMLInputElement;
};

describe('test AutoComplete component', () => {
  // beforeEach(() => {
  //   wrapper = render(<AutoComplete {...testProps} />);
  //   inputNode = screen.getByPlaceholderText('auto-complete') as HTMLInputElement;
  // });
  it('test basic AutoComplete behavior', async () => {
    // input change
    setup();
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument();
    });
    // should have two suggestion items
    // expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2);
    expect(screen.getAllByRole('listitem').length).toEqual(2);

    //click the first item
    fireEvent.click(screen.getByText('ab'));
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
    //fill the input
    expect(inputNode.value).toBe('ab');
  });

  it('should provide keyboard support', async () => {
    // input change
    setup();
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument();
    });
    const firstResult = screen.queryByText('ab');
    const secondResult = screen.queryByText('abc');

    // arrow down
    // https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass('is-active');
    //arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass('is-active');
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass('is-active');
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
  });

  it('click outside should hide the dropdown', async () => {
    // input change
    setup();
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
  });
  it('renderOption should generate the right template', () => {});
  it('async fetchSuggestions should works fine', () => {});
});

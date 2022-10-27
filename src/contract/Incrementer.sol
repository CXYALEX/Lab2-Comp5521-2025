// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @dev this contract is a incrementer
 * It holds a counter which will be incremented each time the increment method is called
 */
contract Incrementer {

  /**
   * @notice the counter state variable
   */
  uint256 public counter;
  
  /**
   * @notice the constructor, which takes an parameter to initialize the counter
   */
  constructor(uint256 _counter) {
    counter = _counter;
  }

  /**
   * @notice increment the counter by _value
   * @param _value the value to be incremented
   */
  function increment(uint256 _value) public {
    counter = counter + _value;
  }

  /**
   * @notice clear the counter to 0
   */
  function reset() public {
    counter = 0;    
  }

  /**
   * @notice get the current state of counter
   */
  function getCounter() public view returns (uint256) {
    return counter;
  }
}

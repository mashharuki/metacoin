// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25;

// ConvertLibコントラクト
library ConvertLib{
	// コインの価値をEthに変換するための関数
	function convert(uint amount,uint conversionRate) public pure returns (uint convertedAmount) {
		return amount * conversionRate;
	}
}

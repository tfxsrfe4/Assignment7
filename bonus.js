// LeetCode: Roman to Integer
// Time: O(n), Space: O(1)
function romanToInt(s) {
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const current = values[s[i]];
    const next = values[s[i + 1]] || 0;
    total += current < next ? -current : current;
  }

  return total;
}

// Examples:
console.log(romanToInt("III"));     // 3
console.log(romanToInt("LVIII"));   // 58
console.log(romanToInt("MCMXCIV")); // 1994

module.exports = romanToInt;

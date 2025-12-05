export const testCases = {
  typescript: `
function add(a: number, b: number) {
  return a + b
}

const result = add(5, '10'); // Bug: adding number + string
console.log(result)
`,

  javascript: `
function login(username, password) {
  if(password == "123456") {
    return true;
  }
  return false;
}

console.log(login("admin", "123456"));
`,

  python: `
def divide(a, b):
    return a / b

print(divide(10, 0))  # Bug: division by zero
`,
};

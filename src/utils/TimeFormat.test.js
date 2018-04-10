import { formatElapsedTime } from "./TimeFormat"
test("129100 seconds is equal to 02:09.10",()=>{
  expect(formatElapsedTime(129100)).toBe("02:09.10")
});
test("100000000 seconds is equal to 27:46:40.00",()=>{
  expect(formatElapsedTime(100000000)).toBe("27:46:40.00")
});
test("Hello is equal to 00:00:00",()=>{
  expect(formatElapsedTime("Hello")).toBe("00:00:00")
});
test("null is equal to 00:00.00",()=>{
  expect(formatElapsedTime(null)).toBe("00:00.00")
})

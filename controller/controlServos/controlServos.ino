#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

#define NUM_VALUES 17
#define PWM_ADDR 0x40

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(PWM_ADDR);

int* parseValues(String input) {
  static int values[NUM_VALUES];
  int count = 0;
  String valueStr;

  for (int i = 0; i < input.length(); i++) {
    if (input.charAt(i) == ' ') {
      values[count] = valueStr.toInt();
      valueStr = "";
      count++;
    } else {
      valueStr += input.charAt(i);
    }
  }
  values[count] = valueStr.toInt();

  return values;
}

void setup() {
  Serial.begin(9600);

  pwm.begin();
  pwm.setPWMFreq(60);
}

void loop() {
  String message = Serial.readStringUntil('\n');
  int* values = parseValues(message);

  for (int i = 0; i < NUM_VALUES; i++) {
    pwm.setPWM(i, 0, map(values[i], 0, 180, 150, 600));
  }
}
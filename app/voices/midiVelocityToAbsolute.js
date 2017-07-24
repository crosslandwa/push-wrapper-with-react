'use strict'

const velocityToAbsolute = {
  0: 0.,
  1: 0.000442,
  2: 0.000596,
  3: 0.000759,
  4: 0.000933,
  5: 0.001109,
  6: 0.001303,
  7: 0.001549,
  8: 0.00182,
  9: 0.002113,
  10: 0.002483,
  11: 0.002884,
  12: 0.00335,
  13: 0.00389,
  14: 0.004467,
  15: 0.005188,
  16: 0.005957,
  17: 0.006839,
  18: 0.007762,
  19: 0.00881,
  20: 0.010116,
  21: 0.011482,
  22: 0.012882,
  23: 0.014454,
  24: 0.016218,
  25: 0.018197,
  26: 0.020417,
  27: 0.022646,
  28: 0.025119,
  29: 0.027861,
  30: 0.030903,
  31: 0.033884,
  32: 0.037154,
  33: 0.040738,
  34: 0.044157,
  35: 0.048417,
  36: 0.052481,
  37: 0.056885,
  38: 0.060954,
  39: 0.066069,
  40: 0.070795,
  41: 0.075858,
  42: 0.080353,
  43: 0.086099,
  44: 0.091201,
  45: 0.096605,
  46: 0.101158,
  47: 0.107152,
  48: 0.112202,
  49: 0.11749,
  50: 0.121619,
  51: 0.12735,
  52: 0.131826,
  53: 0.136458,
  54: 0.141254,
  55: 0.146218,
  56: 0.151356,
  57: 0.158489,
  58: 0.164059,
  59: 0.169824,
  60: 0.175792,
  61: 0.18197,
  62: 0.188365,
  63: 0.194984,
  64: 0.204174,
  65: 0.211349,
  66: 0.218776,
  67: 0.226464,
  68: 0.234423,
  69: 0.242661,
  70: 0.251189,
  71: 0.263027,
  72: 0.27227,
  73: 0.281838,
  74: 0.291743,
  75: 0.301995,
  76: 0.312608,
  77: 0.327341,
  78: 0.338844,
  79: 0.350752,
  80: 0.363078,
  81: 0.375837,
  82: 0.389045,
  83: 0.402717,
  84: 0.421697,
  85: 0.436516,
  86: 0.451856,
  87: 0.467735,
  88: 0.484172,
  89: 0.501187,
  90: 0.5188,
  91: 0.54325,
  92: 0.562341,
  93: 0.582103,
  94: 0.60256,
  95: 0.623735,
  96: 0.645654,
  97: 0.676083,
  98: 0.699842,
  99: 0.724436,
  100: 0.749894,
  101: 0.776247,
  102: 0.803526,
  103: 0.831764,
  104: 0.870964,
  105: 0.901571,
  106: 0.933254,
  107: 0.966051,
  108: 1.,
  109: 1.035142,
  110: 1.071519,
  111: 1.122018,
  112: 1.161449,
  113: 1.202264,
  114: 1.244515,
  115: 1.28825,
  116: 1.333521,
  117: 1.396368,
  118: 1.44544,
  119: 1.496236,
  120: 1.548817,
  121: 1.603245,
  122: 1.659587,
  123: 1.717908,
  124: 1.798871,
  125: 1.862087,
  126: 1.927525,
  127: 1.995262
}

module.exports = function(velocity) {
  return velocityToAbsolute[velocity]
}

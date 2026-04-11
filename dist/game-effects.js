(function attachGameEffects(globalScope) {
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp01(value) {
    return Math.max(0, Math.min(1, value));
  }

  function lerpColor(from, to, t) {
    const p = clamp01(t);
    return {
      r: Math.round(lerp(from.r, to.r, p)),
      g: Math.round(lerp(from.g, to.g, p)),
      b: Math.round(lerp(from.b, to.b, p)),
    };
  }

  function quadraticBezier(p0, p1, p2, t) {
    const inv = 1 - t;
    return {
      x: inv * inv * p0.x + 2 * inv * t * p1.x + t * t * p2.x,
      y: inv * inv * p0.y + 2 * inv * t * p1.y + t * t * p2.y,
    };
  }

  function quadraticBezierTangent(p0, p1, p2, t) {
    return {
      x: 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
      y: 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
    };
  }

  globalScope.GameEffects = {
    lerp,
    clamp01,
    lerpColor,
    quadraticBezier,
    quadraticBezierTangent,
  };
})(window);

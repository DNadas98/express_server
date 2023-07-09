const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      connectSrc: ["'self'"]
    }
  },
  hidePoweredBy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: {
    policy: "strict-origin-when-cross-origin"
  },
  frameguard: {
    action: "sameorigin"
  },
  dnsPrefetchControl: {
    allow: false
  },
  expectCt: {
    enforce: true,
    maxAge: 30
  }
};

module.exports = helmetConfig;

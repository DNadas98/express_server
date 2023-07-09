const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https://avatars.githubusercontent.com/"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      connectSrc: ["'self'", `${process.env.FRONTEND_URL}/`, "https://api.github.com/"]
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

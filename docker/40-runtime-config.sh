#!/bin/sh
# Körs av nginx-imagen när containern startar (allt i /docker-entrypoint.d/ körs före nginx).
# Skriver config.js från miljövariabler – samma image får olika konfiguration i
# lokal, staging och prod utan att byggas om. Här finns bara publika värden:
# allt i config.js kan läsas av vem som helst i browsern. Aldrig nycklar här.
set -eu

# Feature flags: bara "true" räknas som på. Allt annat (tomt, "false", felstavat) = av.
# Det är medvetet: en flagga som saknas i prod ska inte råka slå på något.
case "${FEATURE_NORWAY:-}" in
  true) NORWAY=true ;;
  *)    NORWAY=false ;;
esac

cat > /usr/share/nginx/html/config.js <<CONF
window.__KRAFTLY__ = {
  env: '${APP_ENV:-lokal}',
  features: { norway: ${NORWAY} }
}
CONF
echo "runtime-config: APP_ENV=${APP_ENV:-lokal} FEATURE_NORWAY=${NORWAY}"

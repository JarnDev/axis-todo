const process = require('process');
const { Metadata, credentials } = require('@grpc/grpc-js');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const {
  SemanticResourceAttributes,
} = require('@opentelemetry/semantic-conventions');
const {
  CollectorTraceExporter,
} = require('@opentelemetry/exporter-collector-grpc');
console.log('******', process.env.HONEYCOMB_KEY);
const metadata = new Metadata();
metadata.set('x-honeycomb-team', process.env.HONEYCOMB_KEY);
metadata.set('x-honeycomb-dataset', 'Axis');
const traceExporter = new CollectorTraceExporter({
  url: 'grpc://api.honeycomb.io:443/',
  credentials: credentials.createSsl(),
  metadata,
});

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'Axis',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk
  .start()
  .then(() => console.log('Tracing initialized'))
  .catch((error) => console.log('Error initializing tracing', error));

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

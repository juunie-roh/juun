/**
 * @name Custom sanitizer definitions for XSS detection
 * @description Defines custom sanitizer functions that CodeQL should recognize
 * @kind path-problem
 * @id js/custom-xss-sanitizers
 */

import javascript
import DataFlow::PathGraph

/**
 * A taint-tracking configuration for recognizing safeUrl as a sanitizer
 */
module SafeUrlSanitizerConfig implements DataFlow::ConfigSig {
  predicate isSource(DataFlow::Node source) {
    source instanceof RemoteFlowSource
  }

  predicate isSink(DataFlow::Node sink) {
    exists(DOM::AttributeDefinition attr |
      attr.getName() = "href" and
      sink = attr.getValueNode()
    )
  }

  predicate isBarrier(DataFlow::Node node) {
    // Mark safeUrl return values as sanitized
    exists(DataFlow::CallNode call |
      call.getCalleeName() = "safeUrl" and
      node = call.getASuccessor*()
    )
  }
}

module SafeUrlSanitizerFlow = TaintTracking::Global<SafeUrlSanitizerConfig>;

from SafeUrlSanitizerFlow::PathNode source, SafeUrlSanitizerFlow::PathNode sink
where SafeUrlSanitizerFlow::flowPath(source, sink)
select sink.getNode(), source, sink, "Potential XSS vulnerability from $@.", source.getNode(),
  "user-provided value"

/**
 * Kubernetes
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: unversioned
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * EndpointPort is a tuple that describes a single port.
 */
export class V1EndpointPort {
  /**
   * The application protocol for this port. This is used as a hint for implementations to offer richer behavior for protocols that they understand. This field follows standard Kubernetes label syntax. Valid values are either:  * Un-prefixed protocol names - reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names).  * Kubernetes-defined prefixed names:   * 'kubernetes.io/h2c' - HTTP/2 over cleartext as described in https://www.rfc-editor.org/rfc/rfc7540  * Other protocols should use implementation-defined prefixed names such as mycompany.com/my-custom-protocol.
   */
  appProtocol?: string
  /**
   * The name of this port.  This must match the 'name' field in the corresponding ServicePort. Must be a DNS_LABEL. Optional only if one port is defined.
   */
  name?: string
  /**
   * The port number of the endpoint.
   */
  port: number
  /**
   * The IP protocol for this port. Must be UDP, TCP, or SCTP. Default is TCP.
   */
  protocol?: string
}

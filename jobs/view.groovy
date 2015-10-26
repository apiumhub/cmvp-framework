/**
 * @author kevin
 * @since 10/1/15.
 */
buildPipelineView('cmvp-framework') {
    filterBuildQueue()
    filterExecutors()
    title('AXA Manager Frontend')
    displayedBuilds(5)
    selectedJob('cmvp-framework-build')
    alwaysAllowManualTrigger()
    showPipelineParameters()
    refreshFrequency(5)
}

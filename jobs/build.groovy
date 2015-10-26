import com.apiumtech.dsl.DockerPublishingJob
import com.apiumtech.dsl.DockerPullingJob

/**
 * @author kevin
 * @since 10/1/15.
 */

def DockerImage = 'docker.apiumtech.io/cmvp-framework'

DockerPublishingJob.create(job("cmvp-framework-build"), DockerImage) {
    steps {
        shell("make docker-build")
    }
}
.pollingScm('https://github.com/apiumtech/cmvp-framework.git')
.jobAuthorization()

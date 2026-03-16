import PageLayout from '@/components/PageLayout';

export default function TermsOfService() {
  return (
    <PageLayout>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-gray-400">Last updated: February 15, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using GDrive Your Music (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p>
                GDrive Your Music is a web application that allows users to upload music files to their personal Google Drive account and generate shareable links and XML playlists. The service acts as an intermediary between your local files and your Google Drive storage.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Upload music files from your computer to your Google Drive</li>
                <li>Generate direct download links for your uploaded music</li>
                <li>Export XML playlist files compatible with music players</li>
                <li>Organize your music in folders and playlists</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Only upload music files that you own or have the legal right to store and share</li>
                <li>Not upload copyrighted material without proper authorization</li>
                <li>Not use the service for illegal activities</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Not attempt to circumvent any security measures</li>
                <li>Not abuse or overload the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Copyright and Intellectual Property</h2>
              <p>
                You retain all rights to the music files you upload. By using this service, you represent and warrant that you have the necessary rights to upload, store, and share the content you submit. We do not claim ownership of your content.
              </p>
              <p className="mt-2">
                You are solely responsible for ensuring that your use of the service complies with applicable copyright laws and does not infringe upon the rights of third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Google Drive Integration</h2>
              <p>
                This service integrates with Google Drive through official APIs. By using this service, you also agree to comply with Google&apos;s Terms of Service and Privacy Policy. We are not responsible for any changes to Google&apos;s services or policies that may affect the functionality of our application.
              </p>
              <p className="mt-2">
                Your files are stored in your personal Google Drive account. We do not store your files on our servers beyond temporary processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Data and Privacy</h2>
              <p>
                We respect your privacy and handle your data in accordance with our Privacy Policy. We only access the minimum necessary information to provide the service and do not share your personal information with third parties except as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Service Availability</h2>
              <p>
                We strive to maintain high availability but do not guarantee uninterrupted service. The service may be temporarily unavailable due to maintenance, updates, or technical issues. We are not liable for any losses resulting from service interruptions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <p>
                The service is provided &quot;as is&quot; without warranties of any kind. We are not liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of the service, including but not limited to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Loss of data or files</li>
                <li>Service interruptions</li>
                <li>Unauthorized access to your account</li>
                <li>Technical malfunctions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Account Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to the service for users who violate these terms. You may also terminate your use of the service at any time by disconnecting your Google Drive account and ceasing to use the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the service after any changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Services</h2>
              <p>
                The service may integrate with third-party services (such as Google Drive). We are not responsible for the availability, content, or practices of these third-party services. Your use of such services is subject to their respective terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the appropriate courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us through our support channels or by creating an issue on our GitHub repository.
              </p>
            </section>

            <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-400">
                <strong>Important:</strong> By using GDrive Your Music, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
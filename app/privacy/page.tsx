import PageLayout from '@/components/PageLayout';

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: February 15, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                This Privacy Policy describes how GDrive Your Music collects, uses, and protects your information when you use our service. We are committed to protecting your privacy and handling your data responsibly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-white mb-2">2.1 Information You Provide</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Music files you choose to upload</li>
                <li>Folder names and file organization preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">2.2 Information from Google Drive</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your Google account email (for authentication)</li>
                <li>Access tokens to interact with your Google Drive</li>
                <li>Basic profile information from your Google account</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">2.3 Technical Information</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Browser type and version</li>
                <li>IP address (for security and abuse prevention)</li>
                <li>Usage patterns and error logs</li>
                <li>Session data (temporarily stored in browser cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Authenticate you with Google Drive</li>
                <li>Upload and organize your music files in your Google Drive</li>
                <li>Generate shareable links for your music files</li>
                <li>Create XML playlist exports</li>
                <li>Provide technical support and improve our service</li>
                <li>Detect and prevent abuse or security issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Storage and Processing</h2>

              <h3 className="text-xl font-semibold text-white mb-2">4.1 Your Files</h3>
              <p>
                Your music files are stored directly in your personal Google Drive account. We do not store copies of your files on our servers. Files may be temporarily processed in memory during upload but are not permanently stored by us.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">4.2 Authentication Data</h3>
              <p>
                We store minimal authentication information (access tokens) temporarily in browser cookies to maintain your session. These tokens are automatically refreshed through Google APIs and expire according to Google security policies.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">4.3 Server Logs</h3>
              <p>
                We may keep server logs for debugging and security purposes. These logs contain technical information such as timestamps, IP addresses, and error messages but do not contain your personal files or their contents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Information Sharing</h2>
              <p>We do not sell, trade, or share your personal information with third parties except:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>With Google Drive (as necessary for the service to function)</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
                <li>With your explicit consent</li>
              </ul>
              <p className="mt-2">
                We do not have any advertising partners or data brokers. Your information is not used for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Google Drive Integration</h2>
              <p>
                Our service integrates with Google Drive using official Google APIs. When you connect your Google Drive account:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>You grant us permission to upload files to your Drive</li>
                <li>You grant us permission to read file metadata from your Drive</li>
                <li>We can create and manage folders in your Drive</li>
                <li>We can set sharing permissions on uploaded files</li>
              </ul>
              <p className="mt-2">
                These permissions are used solely to provide the service functionality. Google&apos;s Privacy Policy also applies to your use of Google Drive through our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Data Security</h2>
              <p>We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>All data transmission uses HTTPS encryption</li>
                <li>Authentication tokens are secure and expire automatically</li>
                <li>We follow security best practices for web applications</li>
                <li>Access to any stored data is strictly limited</li>
              </ul>
              <p className="mt-2">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights and Choices</h2>

              <h3 className="text-xl font-semibold text-white mb-2">8.1 Access and Control</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>You can disconnect your Google Drive account at any time</li>
                <li>You can delete files from your Google Drive directly</li>
                <li>You can revoke our app permissions in your Google Account settings</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">8.2 Data Portability</h3>
              <p>
                Your music files remain in your Google Drive account and you have full control over them. You can download, move, or delete them at any time using Google Drive directly.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">8.3 Account Deletion</h3>
              <p>
                To delete your account data, simply disconnect your Google Drive account from our service. This will remove any stored authentication tokens. Your files will remain in your Google Drive account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Cookies and Local Storage</h2>
              <p>We use browser cookies and local storage to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Maintain your authentication session</li>
                <li>Store user preferences and settings</li>
                <li>Improve user experience and remember your choices</li>
              </ul>
              <p className="mt-2">
                You can configure your browser to refuse cookies, but this may affect the functionality of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Children&apos;s Privacy</h2>
              <p>
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. International Data Transfers</h2>
              <p>
                Your information may be processed and stored in different countries where our service infrastructure is located. We ensure that any international transfers comply with applicable privacy laws and maintain appropriate security standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the updated policy on this page with a new effective date. Your continued use of the service after any changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us through our support channels or by creating an issue on our GitHub repository.
              </p>
            </section>

            <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-400">
                <strong>Summary:</strong> We only collect what we need to provide the service, we don&apos;t sell your data, your files stay in your Google Drive, and you have full control over your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
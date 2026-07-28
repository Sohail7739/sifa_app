import LegalPageLayout from './components/LegalPageLayout';
import { useTranslation } from './contexts/TranslationContext';

export default function PrivacyPolicy() {
  const { isRTL } = useTranslation();

  return (
    <LegalPageLayout titleKey="legal.privacyPolicy">
      {isRTL ? (
        <>
          <p className="legal-date">الخبر، المملكة العربية السعودية — تاريخ آخر تحديث: 28 يوليو 2026</p>
          <p>
            هذه الوثيقة صادرة عن شركة صفة للاستشارات ("صفة"، "الشركة"، "نحن")، ومقرها مدينة الخبر بالمملكة العربية السعودية، والمتخصصة في تقديم الاستشارات التسويقية وبناء العلامات التجارية والاستشارات المالية والاستثمارية للشركات الناشئة والمنشآت الصغيرة والمتوسطة، والشركات الكبرى، والجهات الحكومية والقطاع العام. تنظّم هذه الوثيقة العلاقة بين الشركة وعملائها وزوّار موقعها الإلكتروني ومنصاتها الرقمية.
          </p>

          <h2>1. مقدمة</h2>
          <p>
            تحترم شركة صفة للاستشارات خصوصية عملائها والزوار والمتعاملين معها، وتلتزم بحماية بياناتهم الشخصية وفقاً لنظام حماية البيانات الشخصية الصادر في المملكة العربية السعودية ولوائحه التنفيذية. توضح هذه السياسة كيفية جمع البيانات الشخصية واستخدامها ومشاركتها وحمايتها عند تعاملكم معنا عبر الموقع الإلكتروني أو حسابات التواصل الاجتماعي أو خلال تقديم خدماتنا الاستشارية.
          </p>

          <h2>2. البيانات التي نقوم بجمعها</h2>
          <ul>
            <li>البيانات التعريفية: الاسم، المسمى الوظيفي، اسم المنشأة أو الجهة، البريد الإلكتروني، رقم الهاتف.</li>
            <li>بيانات التواصل والاستفسارات المُرسلة عبر النماذج الإلكترونية أو واتساب أو البريد الإلكتروني.</li>
            <li>البيانات المالية والتجارية اللازمة لتقديم الاستشارات المالية والاستثمارية، بالقدر الذي يقدّمه العميل طواعية.</li>
            <li>بيانات الاستخدام التقنية: عنوان IP، نوع المتصفح، الصفحات المُزارة، ووقت الزيارة.</li>
            <li>بيانات يتم جمعها من خلال ملفات تعريف الارتباط (الكوكيز) وأدوات التحليل الرقمي.</li>
          </ul>

          <h2>3. أغراض جمع البيانات واستخدامها</h2>
          <ul>
            <li>تقديم الخدمات الاستشارية التسويقية والمالية والاستثمارية المتفق عليها مع العميل.</li>
            <li>التواصل بشأن طلبات الاستفسار، عروض الأسعار، والمواعيد.</li>
            <li>تحسين الموقع الإلكتروني والمحتوى الرقمي وقياس أداء الحملات التسويقية.</li>
            <li>إرسال النشرات البريدية والمحتوى التوعوي لمن يشترك بذلك اختيارياً.</li>
            <li>الامتثال للالتزامات النظامية والتعاقدية المترتبة على الشركة.</li>
          </ul>

          <h2>4. الأساس النظامي لمعالجة البيانات</h2>
          <p>
            تُعالج صفة البيانات الشخصية استناداً إلى موافقة صاحب البيانات، أو لتنفيذ التزام تعاقدي معه، أو للامتثال لالتزام نظامي، أو لتحقيق مصلحة مشروعة للشركة لا تتعارض مع حقوق صاحب البيانات وحرياته الأساسية.
          </p>

          <h2>5. مشاركة البيانات مع أطراف ثالثة</h2>
          <p>
            لا تقوم صفة ببيع البيانات الشخصية أو تأجيرها لأي طرف ثالث. وقد تتم مشاركة البيانات في الحدود اللازمة مع مزوّدي الخدمات التقنية (مثل استضافة المواقع أو أدوات إدارة علاقات العملاء)، أو الجهات النظامية عند الطلب الرسمي، وذلك مع الحرص على وجود التزامات كافية بحماية سرية هذه البيانات.
          </p>

          <h2>6. حماية البيانات وأمنها</h2>
          <p>
            تتخذ الشركة إجراءات تقنية وتنظيمية معقولة لحماية البيانات الشخصية من الوصول غير المصرح به أو الإفصاح أو التعديل أو الإتلاف، مع مراجعة دورية لهذه الإجراءات بما يتناسب مع طبيعة البيانات المعالجة.
          </p>

          <h2>7. ملفات تعريف الارتباط (الكوكيز)</h2>
          <p>
            يستخدم موقع صفة الإلكتروني ملفات تعريف الارتباط لتحسين تجربة التصفح وقياس أداء المحتوى. يمكن للزائر إدارة إعدادات هذه الملفات أو تعطيلها من خلال إعدادات المتصفح المستخدم، مع العلم أن ذلك قد يؤثر على بعض وظائف الموقع.
          </p>

          <h2>8. حقوق صاحب البيانات</h2>
          <ul>
            <li>الحق في الاطلاع على البيانات الشخصية المحتفظ بها لدى الشركة.</li>
            <li>الحق في طلب تصحيح البيانات غير الدقيقة أو غير المكتملة.</li>
            <li>الحق في طلب حذف البيانات في الحالات التي يقرها النظام.</li>
            <li>الحق في سحب الموافقة على المعالجة في أي وقت، دون إخلال بالمعالجات السابقة.</li>
          </ul>
          <p>يمكن ممارسة هذه الحقوق عبر التواصل مع الشركة على بيانات الاتصال الموضحة في نهاية هذه الوثيقة.</p>

          <h2>9. مدة الاحتفاظ بالبيانات</h2>
          <p>
            تحتفظ الشركة بالبيانات الشخصية للمدة اللازمة لتحقيق الغرض من جمعها، أو للمدة التي تستوجبها الأنظمة واللوائح المعمول بها في المملكة، ثم يتم حذفها أو إخفاء هويتها بشكل آمن.
          </p>

          <h2>10. التعديلات على سياسة الخصوصية</h2>
          <p>
            تحتفظ صفة بحقها في تعديل هذه السياسة من وقت لآخر بما يواكب التطورات النظامية أو التشغيلية، ويُنشر أي تعديل جوهري على الموقع الإلكتروني مع تحديث تاريخ آخر مراجعة أعلى هذه الوثيقة.
          </p>

          <div className="legal-contact-box">
            <strong>بيانات التواصل:</strong>
            <p style={{ margin: '0.5rem 0 0' }}>البريد الإلكتروني: <a href="mailto:Sifa@sifa.consulting">Sifa@sifa.consulting</a></p>
            <p style={{ margin: '0.25rem 0 0' }}>الهاتف: <a href="tel:+966531687985">‎+966 53 168 7985</a></p>
          </div>
        </>
      ) : (
        <>
          <p className="legal-date">Al Khobar, Kingdom of Saudi Arabia — Last Updated: 28 July 2026</p>
          <p>
            This document is issued by Sifa Consulting ("Sifa", "the Company", "we", "us"), headquartered in Al Khobar, Kingdom of Saudi Arabia. The company specializes in providing marketing consulting, brand building, financial consulting, and investment advisory services for startups, SMEs, large companies, government entities, and the public sector. This document regulates the relationship between the company, its clients, website visitors, and users of its digital platforms.
          </p>

          <h2>1. Introduction</h2>
          <p>
            Sifa Consulting respects the privacy of its clients, visitors, and users and is committed to protecting their personal data in accordance with the Saudi Personal Data Protection Law (PDPL) and its implementing regulations. This policy explains how personal data is collected, used, shared, and protected when you interact with us through our website, social media accounts, or while receiving our consulting services.
          </p>

          <h2>2. Data We Collect</h2>
          <ul>
            <li>Identification information: Name, job title, company or organization name, email address, and phone number.</li>
            <li>Communication information: Inquiries and messages submitted through website forms, WhatsApp, or email.</li>
            <li>Financial and business information required to provide financial and investment consulting services, provided voluntarily by the client.</li>
            <li>Technical usage data: IP address, browser type, visited pages, and visit time.</li>
            <li>Cookies and analytics data: Information collected through cookies and digital analytics tools.</li>
          </ul>

          <h2>3. Purpose of Data Collection and Usage</h2>
          <ul>
            <li>Providing agreed marketing, financial, and investment consulting services.</li>
            <li>Communicating regarding inquiries, quotations, and appointments.</li>
            <li>Improving the website, digital content, and measuring marketing campaign performance.</li>
            <li>Sending newsletters and educational content to users who voluntarily subscribe.</li>
            <li>Complying with legal and contractual obligations.</li>
          </ul>

          <h2>4. Legal Basis for Processing Data</h2>
          <p>
            Sifa processes personal data based on the consent of the data owner, performing contractual obligations, compliance with legal requirements, or legitimate business interests that do not conflict with the rights and freedoms of the data owner.
          </p>

          <h2>5. Sharing Data with Third Parties</h2>
          <p>
            Sifa does not sell or rent personal data to third parties. Data may be shared when necessary with technology service providers (such as website hosting providers or CRM tools), or government authorities when officially required. The company ensures appropriate confidentiality and data protection measures are maintained.
          </p>

          <h2>6. Data Protection and Security</h2>
          <p>
            The company takes reasonable technical and organizational measures to protect personal data from unauthorized access, disclosure, modification, or destruction. These measures are reviewed periodically according to the nature of the processed data.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Sifa's website uses cookies to improve browsing experience and measure content performance. Visitors can manage or disable cookies through their browser settings; however, this may affect certain website functions.
          </p>

          <h2>8. Data Owner Rights</h2>
          <ul>
            <li>The right to access personal data held by the company.</li>
            <li>The right to request correction of inaccurate or incomplete data.</li>
            <li>The right to request deletion of data where permitted by law.</li>
            <li>The right to withdraw consent for data processing at any time.</li>
          </ul>
          <p>These rights can be exercised by contacting the company through the contact details provided at the end of this document.</p>

          <h2>9. Data Retention Period</h2>
          <p>
            The company retains personal data only for the period necessary to fulfill the purpose for which it was collected, or as required by applicable Saudi laws and regulations. After that, data will be securely deleted or anonymized.
          </p>

          <h2>10. Updates to Privacy Policy</h2>
          <p>
            Sifa reserves the right to update this policy from time to time to reflect legal or operational changes. Any major updates will be published on the website with an updated revision date.
          </p>

          <div className="legal-contact-box">
            <strong>Contact Information:</strong>
            <p style={{ margin: '0.5rem 0 0' }}>Email: <a href="mailto:Sifa@sifa.consulting">Sifa@sifa.consulting</a></p>
            <p style={{ margin: '0.25rem 0 0' }}>Phone: <a href="tel:+966531687985">+966 53 168 7985</a></p>
          </div>
        </>
      )}
    </LegalPageLayout>
  );
}

import LegalPageLayout from './components/LegalPageLayout';
import { useTranslation } from './contexts/TranslationContext';

export default function TermsConditions() {
  const { isRTL } = useTranslation();

  return (
    <LegalPageLayout titleKey="legal.termsConditions">
      {isRTL ? (
        <>
          <p className="legal-date">الخبر، المملكة العربية السعودية — تاريخ آخر تحديث: 28 يوليو 2026</p>

          <h2>1. مقدمة وقبول الشروط</h2>
          <p>
            يُشكّل استخدامكم لموقع صفة الإلكتروني أو طلب أي من خدماتها الاستشارية موافقة صريحة منكم على الالتزام بهذه الشروط والأحكام. في حال عدم الموافقة على أي بند منها، يُرجى التوقف عن استخدام الموقع أو التعاقد مع الشركة.
          </p>

          <h2>2. نطاق الخدمات</h2>
          <ul>
            <li>خدمات الاستشارات التسويقية وبناء العلامة التجارية والحضور الرقمي.</li>
            <li>خدمات الاستشارات المالية والاستثمارية ودراسات الجدوى وإعداد الخطط.</li>
            <li>خدمات مصممة خصيصاً للشركات الناشئة والمنشآت الصغيرة والمتوسطة والشركات الكبرى والجهات الحكومية، وفق نطاق عمل يُحدَّد في عرض أو عقد منفصل لكل مشروع.</li>
          </ul>
          <p>يُتفق على النطاق التفصيلي لكل مشروع، وأسعاره، وجدوله الزمني، ضمن عرض خدمات أو عقد مكتوب مستقل يُعد جزءاً مكملاً لهذه الشروط.</p>

          <h2>3. التزامات العميل</h2>
          <ul>
            <li>تزويد الشركة بالمعلومات والبيانات والمواد اللازمة لتنفيذ الخدمة في وقتها المناسب.</li>
            <li>الرد على طلبات المراجعة والموافقات خلال المدد المتفق عليها لتفادي تأخير سير العمل.</li>
            <li>سداد الأتعاب المتفق عليها في مواعيدها.</li>
            <li>الإفصاح عن أي قيود نظامية أو تنظيمية قد تؤثر على تنفيذ الخدمة.</li>
          </ul>

          <h2>4. التزامات الشركة</h2>
          <ul>
            <li>تقديم الخدمات الاستشارية بمستوى مهني يتوافق مع أفضل الممارسات في مجالي التسويق والاستشارات المالية.</li>
            <li>الحفاظ على سرية معلومات العميل التجارية والمالية وعدم استخدامها إلا في أغراض تنفيذ الخدمة.</li>
            <li>إبلاغ العميل بأي تعديل جوهري على نطاق العمل أو الجدول الزمني أولاً بأول.</li>
          </ul>

          <h2>5. الأتعاب وطرق الدفع</h2>
          <p>
            تُحدَّد أتعاب الخدمات في عرض السعر أو العقد الخاص بكل مشروع، وتُسدَّد وفق الآلية والدفعات المتفق عليها. تُعد الأتعاب غير شاملة لأي رسوم أو ضرائب نظامية إضافية ما لم يُنص على خلاف ذلك صراحة.
          </p>

          <h2>6. الملكية الفكرية والسرية</h2>
          <p>
            تبقى جميع المنهجيات والأدوات والقوالب الداخلية التي تستخدمها صفة في تقديم خدماتها ملكاً لها. أما المخرجات النهائية المُعدّة خصيصاً للعميل (كالخطط والاستراتيجيات والتقارير المُسلَّمة) فتؤول ملكيتها للعميل عند سداد كامل الأتعاب المستحقة، ما لم يُتفق على خلاف ذلك كتابةً. يلتزم الطرفان بالحفاظ على سرية أي معلومات تجارية أو مالية يطّلع عليها أحدهما من الآخر أثناء تنفيذ الخدمة.
          </p>

          <h2>7. حدود المسؤولية</h2>
          <p>
            تبذل صفة العناية المهنية المعقولة في تقديم استشاراتها استناداً إلى المعلومات المقدَّمة من العميل، ولا تضمن تحقيق نتائج تجارية أو مالية معينة، حيث تتأثر هذه النتائج بعوامل خارجة عن إرادة الشركة كظروف السوق وقرارات العميل التنفيذية.
          </p>

          <h2>8. مدة التعاقد وإنهاؤه</h2>
          <p>
            تسري مدة كل مشروع وفق ما هو محدد في عقده الخاص. يجوز لأي من الطرفين إنهاء التعاقد بإشعار كتابي مسبق وفق المدة المتفق عليها، مع التزام العميل بسداد قيمة الأعمال المنجزة فعلياً حتى تاريخ الإنهاء.
          </p>

          <h2>9. القوة القاهرة</h2>
          <p>
            لا يُسأل أي من الطرفين عن التأخير أو الإخلال الناتج عن ظروف قاهرة خارجة عن إرادته، كالكوارث الطبيعية أو الأعطال التقنية الكبرى أو القرارات الحكومية الطارئة.
          </p>

          <h2>10. القانون الواجب التطبيق وتسوية النزاعات</h2>
          <p>
            تخضع هذه الشروط وتُفسَّر وفقاً لأنظمة المملكة العربية السعودية. يسعى الطرفان لتسوية أي نزاع ودياً، وفي حال تعذر ذلك تكون الجهة القضائية أو التحكيمية المختصة في المملكة العربية السعودية هي المرجع الفصل في النزاع.
          </p>

          <h2>11. أحكام عامة</h2>
          <p>
            إذا تبيّن بطلان أي بند من هذه الشروط، فإن ذلك لا يؤثر على سريان باقي البنود. لا يجوز التنازل عن أي حق منصوص عليه في هذه الوثيقة إلا كتابةً.
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

          <h2>1. Introduction and Acceptance of Terms</h2>
          <p>
            Your use of Sifa's website or request for consulting services represents your acceptance of these Terms & Conditions. If you do not agree with any part of these terms, please stop using the website or engaging with the company.
          </p>

          <h2>2. Scope of Services</h2>
          <ul>
            <li>Marketing consulting, brand building, and digital presence services.</li>
            <li>Financial and investment consulting, feasibility studies, and business planning.</li>
            <li>Customized services for startups, SMEs, large companies, and government entities based on a separate quotation or contract for each project.</li>
          </ul>
          <p>The detailed scope, pricing, and timeline for each project will be defined in a separate service proposal or written agreement.</p>

          <h2>3. Client Responsibilities</h2>
          <ul>
            <li>Provide required information, data, and materials needed to complete the service.</li>
            <li>Respond to review requests and approvals within agreed timelines.</li>
            <li>Pay agreed fees on time.</li>
            <li>Disclose any regulatory restrictions that may affect service delivery.</li>
          </ul>

          <h2>4. Company Responsibilities</h2>
          <ul>
            <li>Providing consulting services professionally according to best practices.</li>
            <li>Maintaining confidentiality of client business and financial information.</li>
            <li>Informing clients about any major changes in project scope or timeline.</li>
          </ul>

          <h2>5. Fees and Payment Methods</h2>
          <p>
            Service fees are determined in the quotation or contract for each project and are paid according to the agreed payment schedule. Fees do not include additional taxes or legal charges unless explicitly stated otherwise.
          </p>

          <h2>6. Intellectual Property and Confidentiality</h2>
          <p>
            All internal methodologies, tools, and templates used by Sifa remain the company's property. Final deliverables created specifically for clients become the client's property after full payment unless otherwise agreed in writing. Both parties must maintain confidentiality of business and financial information shared during the project.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            Sifa provides professional consulting based on information provided by the client. The company does not guarantee specific business or financial results, as outcomes depend on market conditions and client decisions.
          </p>

          <h2>8. Contract Duration and Termination</h2>
          <p>
            Each project duration is determined according to its specific agreement. Either party may terminate the agreement with written notice, while the client remains responsible for completed work.
          </p>

          <h2>9. Force Majeure</h2>
          <p>
            Neither party will be responsible for delays caused by circumstances beyond their control, such as natural disasters, major technical failures, or government decisions.
          </p>

          <h2>10. Applicable Law and Dispute Resolution</h2>
          <p>
            These terms are governed by the laws of the Kingdom of Saudi Arabia. Both parties will attempt to resolve disputes amicably. If unresolved, disputes will be handled by the competent Saudi legal or arbitration authorities.
          </p>

          <h2>11. General Provisions</h2>
          <p>
            If any provision becomes invalid, the remaining provisions will continue to apply. No rights under this document may be transferred without written approval.
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

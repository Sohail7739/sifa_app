import LegalPageLayout from './components/LegalPageLayout';
import { useTranslation } from './contexts/TranslationContext';

export default function ReturnPolicy() {
  const { isRTL } = useTranslation();

  return (
    <LegalPageLayout titleKey="legal.returnPolicy">
      {isRTL ? (
        <>
          <p className="legal-date">الخبر، المملكة العربية السعودية — تاريخ آخر تحديث: 28 يوليو 2026</p>

          <h2>1. طبيعة الخدمات الاستشارية</h2>
          <p>
            نظراً لأن خدمات صفة هي خدمات استشارية تُعدّ وتُنفَّذ بناءً على احتياجات كل عميل على حدة (وليست منتجات أو سلعاً جاهزة)، فإن سياسة الاسترجاع والاستبدال تُطبَّق وفق مراحل تنفيذ المشروع الموضحة أدناه، وليس كاسترجاع سلعة مادية.
          </p>

          <h2>2. الإلغاء قبل بدء تنفيذ العمل</h2>
          <p>
            يحق للعميل إلغاء الطلب واسترداد كامل المبلغ المدفوع إذا تم الإلغاء قبل بدء الشركة الفعلي في تنفيذ أي عمل من أعمال المشروع (كإجراء الاجتماع الاستكشافي الأول أو الشروع في إعداد الاستراتيجية أو الدراسة).
          </p>

          <h2>3. الإلغاء بعد بدء تنفيذ العمل</h2>
          <p>
            في حال طلب الإلغاء بعد بدء تنفيذ العمل، يُسترد للعميل المبلغ المدفوع مخصوماً منه القيمة المقابلة للأعمال والساعات الاستشارية المنجزة فعلياً حتى تاريخ طلب الإلغاء، وذلك بحسب نسبة الإنجاز الموضحة في تقرير سير العمل الخاص بالمشروع.
          </p>

          <h2>4. طلبات التعديل والمراجعة</h2>
          <p>
            قبل اللجوء إلى الاسترجاع، تمنح صفة عملاءها جولة أو أكثر من التعديلات على المخرجات (كالخطط التسويقية أو التقارير المالية) بما يتوافق مع نطاق العمل المتفق عليه أصلاً في العقد، دون رسوم إضافية، ضماناً لتحقيق أعلى درجات الرضا قبل النظر في أي استرجاع.
          </p>

          <h2>5. الحالات غير القابلة للاسترجاع</h2>
          <ul>
            <li>المشاريع أو الخدمات التي تم تسليم مخرجاتها النهائية بالكامل واعتمادها من قِبل العميل كتابةً.</li>
            <li>الرسوم المدفوعة مقابل استشارات فردية أو جلسات تم تنفيذها فعلياً.</li>
            <li>الحالات التي يكون فيها التأخير أو التعثر ناتجاً عن عدم تزويد العميل بالمعلومات أو الموافقات اللازمة في وقتها.</li>
          </ul>

          <h2>6. آلية تقديم طلب الاسترجاع</h2>
          <p>
            يُقدَّم طلب الاسترجاع أو الإلغاء كتابياً عبر البريد الإلكتروني الرسمي للشركة، مع بيان اسم المشروع وتاريخ التعاقد وسبب الطلب، وذلك خلال المدة المتفق عليها في عقد المشروع إن وُجدت.
          </p>

          <h2>7. مدة معالجة الطلب</h2>
          <p>
            تلتزم صفة بمراجعة طلب الاسترجاع والرد عليه خلال مدة لا تتجاوز <strong>عشرة أيام عمل</strong> من تاريخ استلام الطلب المستوفي، على أن تتم إعادة أي مبلغ مستحق خلال مدة لا تتجاوز <strong>خمسة عشر يوم عمل</strong> من تاريخ الموافقة على الطلب، وبنفس وسيلة الدفع الأصلية ما أمكن ذلك.
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

          <h2>1. Nature of Consulting Services</h2>
          <p>
            Since Sifa provides customized consulting services based on each client's specific requirements (not physical products), refunds and exchanges are handled according to project execution stages as outlined below — not as a physical product return.
          </p>

          <h2>2. Cancellation Before Work Begins</h2>
          <p>
            The client may cancel and receive a full refund if cancellation occurs before Sifa starts any actual project work, such as conducting the initial consultation meeting or beginning preparation of a strategy or study.
          </p>

          <h2>3. Cancellation After Work Begins</h2>
          <p>
            If cancellation is requested after work has started, the refund amount will be calculated by deducting the value of completed work and consulting hours actually performed up to the cancellation date, based on the project progress percentage stated in the project progress report.
          </p>

          <h2>4. Revision and Modification Requests</h2>
          <p>
            Before requesting a refund, Sifa provides clients with one or more rounds of revisions on deliverables (such as marketing plans or financial reports) within the originally agreed project scope, at no additional charge, to ensure maximum satisfaction before considering any refund.
          </p>

          <h2>5. Non-Refundable Cases</h2>
          <ul>
            <li>Projects or services where final deliverables have been fully completed and approved by the client in writing.</li>
            <li>Fees paid for completed individual consultations or sessions.</li>
            <li>Cases where delays or setbacks resulted from the client not providing required information or approvals on time.</li>
          </ul>

          <h2>6. Refund Request Process</h2>
          <p>
            Refund or cancellation requests must be submitted in writing through the company's official email, including the project name, contract date, and reason for the request, within the timeframe agreed upon in the project contract if applicable.
          </p>

          <h2>7. Refund Processing Time</h2>
          <p>
            Sifa commits to reviewing the refund request and responding within <strong>10 business days</strong> from receiving a complete request. Approved refunds will be processed within <strong>15 business days</strong> from the approval date, using the original payment method whenever possible.
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

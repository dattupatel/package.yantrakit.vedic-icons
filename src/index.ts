/**
 * @yantrakit/vedic-icons
 *
 * Pure CSS icon library. Import the CSS file to use:
 *
 * @example
 * ```js
 * import '@yantrakit/vedic-icons/css';
 * ```
 *
 * @example
 * ```html
 * <i class="vi vi-diya"></i>
 * ```
 */

/** List of all available icon names. */
export const icons = ['agni-dev','ashoka-chakra','brahma','calendar-holi','calendar-pongol','calendar-swastika','chandra','coin','conch-shell','diya','durga','face-male-sikh','family-gathering','female','firecracker','firecracker-02','ganesha','golden-temple','granth-swastika','hand-holding-rupee','hanumaan','hanumaan-02','havan-fire','india-map','indian-flag','kalash-swastika','kali','kartikeya','konark-sun-temple','krishna','krishna-02','krishna-with-cow','kurma','lakshmi','lingam','lotus','male-sikh','male-sikh02','mandala','mandala-02','matsya','meenakshi-temple','namaste','narasimha','om','parvati','peacock','qutub-minar','radha','rama','rangoli','red-fort','saraswati','scroll','scroll-02','scroll-03','scroll-rolled','scroll-rolled02','shiva','trishul','tilak','sita','surya','taj-mahal','temple','vamana','varaha'] as const;

/** Type representing a valid icon name. */
export type iIconName = (typeof icons)[number];

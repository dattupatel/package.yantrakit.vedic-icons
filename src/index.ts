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
export const icons = ['aarti','aarti-02','agni-dev','ashoka-chakra','brahma','calendar-holi','calendar-om','calendar-pongol','calendar-swastika','chandra','coin','conch-shell','diya','diya-02','diya-03','durga','face-male-sikh','family-gathering','female','firecracker','firecracker-02','ganesha','golden-temple','granth-om','granth-swastika','hand-holding-rupee','hanumaan','hanumaan-02','havan-fire','incense','india-map','indian-flag','indra','kalash-swastika','kali','kartikeya','konark-sun-temple','krishna','krishna-02','krishna-with-cow','kurma','lakshmi','lingam','lotus','mala','male-sikh','male-sikh02','mandala','mandala-02','matsya','meenakshi-temple','moon-crescent-02','namaste','narasimha','om','parvati','peacock','qutub-minar','radha','rama','rangoli','red-fort','rudraksha','saraswati','scroll','scroll-02','scroll-03','scroll-rolled','scroll-rolled02','shiva','sindoor','sita','surya','taj-mahal','temple','tilak','trishul','vamana','varaha','yama','yantra'] as const;

/** Type representing a valid icon name. */
export type iIconName = (typeof icons)[number];

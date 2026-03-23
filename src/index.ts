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
export const icons = ['aarti','aarti-02','agni-dev','ashoka-chakra','banyan-tree','brahma','bull','bull-02','calendar-holi','calendar-om','calendar-pongol','calendar-swastika','chandan','chandra','chandra-02','coconut-oil','coconut-palm','coconut-palms','coin','cow','cow-02','cow-03','deer','deer-02','diya','diya-02','diya-03','durga','elephant','elephant-02','face-male-sikh','family-gathering','female','firecracker','firecracker-02','ganesha','golden-temple','granth-om','granth-swastika','hand-holding-rupee','hanumaan','hanumaan-02','havan-fire','incense','india-map','indian-flag','indra','kalash-swastika','kali','kamdhenu','kartikeya','konark-sun-temple','krishna','krishna-02','krishna-with-cow','kurma','lakshmi','lal-qila','lingam','lion','lion-02','lotus','mala','male-sikh','male-sikh02','mandala','mandala-02','mango','mango-tree','mangoes','matsya','meenakshi-temple','monkey','monkey-02','monkey-03','namaste','narasimha','om','parvati','peacock','qutub-minar','radha','rama','rangoli','rudraksha','saraswati','scroll','scroll-02','scroll-03','scroll-rolled','scroll-rolled02','shankh','shiva','sindoor','sita','surya','swan','taj-mahal','temple','tiger','tiger-02','tilak','trishul','tulsi','vamana','varaha','yama','yantra'] as const;

/** Type representing a valid icon name. */
export type iIconName = (typeof icons)[number];

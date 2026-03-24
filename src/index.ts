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
export const icons = ['aarti','aarti-02','agni-dev','arrow-fire','ashoka-chakra','banyan-tree','brahma','bull','bull-02','calendar-holi','calendar-kite','calendar-om','calendar-pongol','calendar-swastika','chandan','chandra','chandra-02','coconut-oil','coconut-palm','coconut-palms','coin','cow','cow-02','cow-03','deer','deer-02','devi-eyes','dhanush','diwali-lamps','diya','diya-02','diya-03','durga','elephant','elephant-02','face-male-sikh','family-gathering','female','firecracker','firecracker-02','flute','gada','ganesha','golden-temple','granth-om','granth-swastika','hand-holding-rupee','hanumaan','hanumaan-02','havan-fire','hawa-mahal','incense','india-gate','india-map','indian-flag','indra','kalash-swastika','kali','kamdhenu','kartikeya','kathakali','kite','konark-sun-temple','krishna','krishna-02','krishna-with-cow','kurma','lakshmi','lal-qila','lantern','lantern-02','lingam','lion','lion-02','lotus','mahabali','mala','male-sikh','male-sikh02','mandala','mandala-02','mango','mango-tree','mangoes','matsya','meenakshi-temple','monkey','monkey-02','monkey-03','naga','naga-02','namaste','narasimha','om','parvati','peacock','pichkari','pongal','pongal-02','qutub-minar','radha','raksha-bandhan','raksha-bandhan-02','rama','rangoli','rudraksha','saraswati','scroll','scroll-02','scroll-03','scroll-rolled','scroll-rolled02','shankh','shiva','sindoor','sita','snake','surya','swan','taj-mahal','temple','thali','tiger','tiger-02','tilak','toran','toran-02','trishul','tulsi','vamana','varaha','yama','yantra'] as const;

/** Type representing a valid icon name. */
export type iIconName = (typeof icons)[number];

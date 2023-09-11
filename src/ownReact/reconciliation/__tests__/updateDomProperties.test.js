import { updateDomProperties } from '../updateDomProperties';

describe('updateDomProperties', () => {
    it('should update dom properties', () => {
        const instance = {
            className: '',
            style: {}
        };
        const element = {
            props: {
                className: 'foo',
                style: {
                    color: 'red'
                }
            }
        };

        const nextInstance = updateDomProperties(instance, element);

        expect(nextInstance.className).toBe('foo');
        expect(nextInstance.style.color).toBe('red');
    });
});